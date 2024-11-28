import os

def duplicate_title_in_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    start_title = content.find('<title>')
    end_title = content.find('</title>', start_title)
    
    if start_title != -1 and end_title != -1:
        title_element = content[start_title:end_title + len('</title>')]
        new_content = content[:end_title + len('</title>')] + title_element + content[end_title + len('</title>'):]
        
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)

def traverse_and_process(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                duplicate_title_in_html(file_path)

if __name__ == '__main__':
    current_directory = os.getcwd()
    traverse_and_process(current_directory)

