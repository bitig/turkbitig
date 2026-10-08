import os
import re
import shutil
from html.parser import HTMLParser
from pathlib import Path

# Target character: Old Turkic Letter Orkhon A ('𐰀')
TARGET_CHAR = '𐰀'
TARGET_DIR = Path('.')


class IsimDivParser(HTMLParser):
    """Parses HTML content and extracts text inside <div id="isim">."""
    def __init__(self):
        super().__init__()
        self.in_isim = False
        self.depth = 0
        self.text_chunks = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        # Match <div id="isim">
        if tag.lower() == 'div' and attrs_dict.get('id') == 'isim':
            if not self.in_isim:
                self.in_isim = True
                self.depth = 1
                return
        if self.in_isim:
            self.depth += 1

    def handle_endtag(self, tag):
        if self.in_isim:
            self.depth -= 1
            if self.depth == 0:
                self.in_isim = False

    def handle_data(self, data):
        if self.in_isim:
            self.text_chunks.append(data)

    def get_text(self):
        return "".join(self.text_chunks)


def contains_middle_char(text: str, char: str = TARGET_CHAR) -> bool:
    """
    Checks if `char` exists in any word in `text`, strictly in the middle
    (not at the start and not at the end of the word).
    """
    # \w+ matches Unicode word characters (including '𐰀')
    words = re.findall(r'\w+', text)
    for word in words:
        if char in word:
            # Must not be the first character and must not be the last character
            if word[0] != char and word[-1] != char and char in word[1:-1]:
                return True
    return False


def process_html_files():
    # Ensure output directory exists
    TARGET_DIR.mkdir(exist_ok=True)

    current_dir = Path('../')
    # Find all .html files in current directory (excluding target subfolder)
    html_files = [
        f for f in current_dir.glob('*.html') 
        if f.is_file() and f.parent != TARGET_DIR
    ]

    copied_count = 0

    for file_path in html_files:
        try:
            content = file_path.read_text(encoding='utf-8', errors='ignore')
            
            parser = IsimDivParser()
            parser.feed(content)
            div_text = parser.get_text()

            if contains_middle_char(div_text, TARGET_CHAR):
                destination = TARGET_DIR / file_path.name
                shutil.copy2(file_path, destination)
                print(f"Match found. Copied: {file_path.name} -> {destination}")
                copied_count += 1

        except Exception as e:
            print(f"Error processing {file_path.name}: {e}")

    print(f"\nDone. Processed {len(html_files)} files; copied {copied_count} matching file(s) to '{TARGET_DIR}'.")


if __name__ == '__main__':
    process_html_files()
