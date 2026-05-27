with open('frontend/src/components/Footer.jsx', 'r') as f:
    content = f.read()

content = content.replace("fetch('/data/socials.json')", "fetch('/data/socials.json?' + new Date().getTime())")

with open('frontend/src/components/Footer.jsx', 'w') as f:
    f.write(content)

with open('frontend/src/pages/About.jsx', 'r') as f:
    content = f.read()

content = content.replace("fetch('/data/skills.json')", "fetch('/data/skills.json?' + new Date().getTime())")

with open('frontend/src/pages/About.jsx', 'w') as f:
    f.write(content)
