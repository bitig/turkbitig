import glob
import re
import string
from bs4 import BeautifulSoup

# Iterate over all .html files in the current directory
for filename in glob.glob('*.html'):
    # Open and read the HTML file
    with open(filename, 'r', encoding='utf-8') as file:
        html_content = file.read()
    
    # Parse the HTML content with BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Check if <title> or <p> elements are missing
    if not soup.title or not soup.find('p'):
        print(filename)
    else:
        # Get the title text, stripped of leading/trailing whitespace
        title_text = soup.title.text.strip()
        
        # If title text is empty, print filename
        if not title_text:
            print(filename)
        else:
            # Split title into words and get the last word, removing trailing punctuation
            title_words = title_text.split()
            last_word = title_words[-1].rstrip(string.punctuation)
            
            # If last word is empty after removing punctuation, print filename
            if not last_word:
                print(filename)
            else:
                # Get the text of the first <p> element
                first_p_text = soup.find('p').text
                
                # Check if the last word is present as a whole word in the first <p>, case-insensitive
                if not re.search(r'\b{}\b'.format(re.escape(last_word)), first_p_text, re.IGNORECASE):
                    print(filename)
