import os
import re


def remove_prevnext_div(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    modified_content = re.sub(r'<div\s*id\s*=\s*["\']prevnext["\'][^>]*>.*?</div>', '', content, flags=re.IGNORECASE | re.DOTALL)

    with open(file_path, 'w') as f:
        f.write(modified_content)


html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    remove_prevnext_div(file)

print('Prevnext div elements removed successfully.')
