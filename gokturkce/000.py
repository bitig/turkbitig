import os
import re

def update_meta_description(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Find the title tag and extract its contents
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    if title_match:
        title_content = title_match.group(1)

        # Update the meta description tag with the title contents
        updated_content = re.sub(
            r'<meta\s+name="description"\s+content=".*?"\s*/?>',
            f'<meta name="description" content="{title_content}">',
            content,
            flags=re.IGNORECASE
        )

        # Write the updated content back to the file
        with open(file_path, 'w') as file:
            file.write(updated_content)

        print(f"Updated meta description in {file_path}")

def process_html_files():
    for file_name in os.listdir("."):
        if file_name.endswith(".html"):
            file_path = os.path.join(".", file_name)
            update_meta_description(file_path)

process_html_files()
