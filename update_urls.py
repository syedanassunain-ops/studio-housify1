import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'(src|poster)="assets/([^"]+\.(?:jpg|jpeg|png|webp))"'
replacement = r'\1="https://res.cloudinary.com/dc4c5hlgb/image/fetch/f_auto,q_auto/https://raw.githubusercontent.com/syedanassunain-ops/studio-housify1/main/assets/\2"'

new_content = re.sub(pattern, replacement, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Done modifying index.html')
