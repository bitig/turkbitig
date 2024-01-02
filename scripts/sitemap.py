import urllib.request
import urllib.parse
import re
import sys

# Function to check if a URL has a specific file extension
def has_valid_extension(url):
    valid_extensions = ['.pdf', '.ttf', '.png', '.jpg']
    for extension in valid_extensions:
        if url.endswith(extension):
            return False
    return True

# Function to crawl the website and generate the XML sitemap
def generate_sitemap(domain):
    visited_urls = set()  # To keep track of visited URLs
    sitemap = []  # To store the sitemap URLs

    # Function to recursively crawl the website
    def crawl(url):
        # Check if the URL is already visited
        if url in visited_urls:
            return

        # Add the URL to visited URLs
        visited_urls.add(url)

        try:
            # Send a GET request to the URL
            response = urllib.request.urlopen(url)
            content = response.read().decode('utf-8')

            # Find all anchor tags on the page
            anchor_regex = re.compile('<a\s+(?:[^>]*?\s+)?href="([^"]*)"')
            anchors = re.findall(anchor_regex, content)

            # Iterate over the anchor tags
            for anchor in anchors:
                # Parse the anchor URL
                parsed_url = urllib.parse.urljoin(url, anchor)

                # Check if the anchor URL is a valid internal URL within the domain
                parsed_url_parts = urllib.parse.urlparse(parsed_url)
                if parsed_url_parts.scheme == 'http' or parsed_url_parts.scheme == 'https':
                    if parsed_url_parts.netloc == domain:
                        # Skip if the URL has a file extension to be skipped
                        if not has_valid_extension(parsed_url):
                            continue

                        # Skip if the URL is already in the sitemap
                        if parsed_url in sitemap:
                            continue

                        # Append the anchor URL to the sitemap
                        sitemap.append(parsed_url)

                        # Recursively crawl the anchor URL
                        crawl(parsed_url)

            # Update progress verbosely
            sys.stdout.write('\r')
            sys.stdout.write(f"Crawling URL: {url} ...")
            sys.stdout.flush()

        except Exception as e:
            print(f"\nError crawling URL: {url}")
            print(str(e))

    # Start crawling from the provided domain
    starting_url = f"http://{domain}"
    crawl(starting_url)

    # Generate the sitemap XML
    xml_sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for sitemap_url in sitemap:
        xml_sitemap += f'  <url><loc>{sitemap_url}</loc></url>\n'
    xml_sitemap += '</urlset>'

    # Write the XML sitemap to a file
    with open('sitemap.xml', 'w') as file:
        file.write(xml_sitemap)

    print("\nSitemap generated successfully.")

# Prompt for the domain name to crawl
domain = input("Enter the domain name to crawl (e.g., example.com): ")

# Generate the sitemap for the specified domain
print("Crawling in progress...")

# Start crawling
generate_sitemap(domain)
