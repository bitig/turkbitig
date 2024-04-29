import os
import re


def remove_botnav_tags(filename):
    with open(filename, 'r') as file:
        html_content = file.read()

    # Remove <p> tags with name "botnav"
    modified_content = re.sub(r'<p\b[^>]*name\s*=\s*["\']?botnav["\']?[^>]*>.*?</p>', '', html_content, flags=re.IGNORECASE)

    with open(filename, 'w') as file:
        file.write(modified_content)


# Get the current directory
current_directory = os.getcwd()

# Iterate through all files in the directory
for filename in os.listdir(current_directory):
    if filename.endswith(".html"):
        file_path = os.path.join(current_directory, filename)
        # Remove <p> tags named "botnav" in HTML files
        remove_botnav_tags(file_path)
