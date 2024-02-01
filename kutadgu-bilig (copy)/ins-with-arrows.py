import os
import re


def find_prev_next_files(file_list, current_file):
    # Sort the list of files
    sorted_files = sorted(file_list)
    # Get the index of the current file in the sorted list
    current_index = sorted_files.index(current_file)

    # Find the previous file and its shortened title
    if current_index > 0:
        prev_file = sorted_files[current_index - 1]
        with open(prev_file, 'r') as f:
            prev_content = f.read()
        # Extract the title from the previous file's content
        prev_title = re.search(r'<title>(.*?)</title>', prev_content, re.IGNORECASE)
        # Trim the title to 10 characters and add ellipses if necessary
        prev_title = prev_title.group(1)[:10].rstrip('.') + '...' if prev_title else None
    else:
        prev_file = None
        prev_title = None

    # Find the next file and its shortened title
    if current_index < len(sorted_files) - 1:
        next_file = sorted_files[current_index + 1]
        with open(next_file, 'r') as f:
            next_content = f.read()
        # Extract the title from the next file's content
        next_title = re.search(r'<title>(.*?)</title>', next_content, re.IGNORECASE)
        # Trim the title to 10 characters and add ellipses if necessary
        next_title = next_title.group(1)[:10].rstrip('.') + '...' if next_title else None
    else:
        next_file = None
        next_title = None

    return prev_file, prev_title, next_file, next_title


# Get a list of HTML files in the current directory
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Process each HTML file
for file in html_files:
    with open(file, 'r') as f:
        lines = f.readlines()

    # Find the index of the first <hr> tag in the file
    hr_index = next((i for i, line in enumerate(lines) if '<hr' in line), None)

    if hr_index is not None:
        # Find the previous and next files and their shortened titles
        prev_file, prev_title, next_file, next_title = find_prev_next_files(html_files, file)

        # Create the HTML code for the previous and next links
        prevnext_div_top = '<div id="prevnext">\n'

        if prev_file and prev_title:
            # Add double arrows and the shortened title to the previous link
            prev_link_top = '<a href="' + prev_file + '">' + '&#60;&#60; ' + prev_title + '</a>'
            prevnext_div_top += prev_link_top

        if prev_file and next_file:
            prevnext_div_top += ' | '

        if next_file and next_title:
            # Add the shortened title and double arrows to the next link
            next_link_top = '<a href="' + next_file + '">' + next_title + ' &#62;&#62;' + '</a>'
            prevnext_div_top += next_link_top

        prevnext_div_top += '\n</div>\n'

        # Insert the previous and next links before the first <hr> tag
        lines.insert(hr_index, prevnext_div_top)

    modified_content = ''.join(lines)

    # Write the modified content back to the file
    with open(file, 'w') as f:
        f.write(modified_content)

print('HTML files modified successfully.')
