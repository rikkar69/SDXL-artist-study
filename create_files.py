import os

# The Liquid code for each file
content = '''---
layout: default
---
<link rel="stylesheet" href="{{ '/main.css' | relative_url }}">
{% assign letter = 'A' %}
<div class="alphabet-nav">
    <a href="{{ site.baseurl }}/index.html">All</a>
    <a href="{{ site.baseurl }}/A.html">A</a>
    <a href="{{ site.baseurl }}/B.html">B</a>
    <a href="{{ site.baseurl }}/C.html">C</a>
    <a href="{{ site.baseurl }}/D.html">D</a>
    <a href="{{ site.baseurl }}/E.html">E</a>
    <a href="{{ site.baseurl }}/F.html">F</a>
    <a href="{{ site.baseurl }}/G.html">G</a>
    <a href="{{ site.baseurl }}/H.html">H</a>
    <a href="{{ site.baseurl }}/I.html">I</a>
    <a href="{{ site.baseurl }}/J.html">J</a>
    <a href="{{ site.baseurl }}/K.html">K</a>
    <a href="{{ site.baseurl }}/L.html">L</a>
    <a href="{{ site.baseurl }}/M.html">M</a>
    <a href="{{ site.baseurl }}/N.html">N</a>
    <a href="{{ site.baseurl }}/O.html">O</a>
    <a href="{{ site.baseurl }}/P.html">P</a>
    <a href="{{ site.baseurl }}/Q.html">Q</a>
    <a href="{{ site.baseurl }}/R.html">R</a>
    <a href="{{ site.baseurl }}/S.html">S</a>
    <a href="{{ site.baseurl }}/T.html">T</a>
    <a href="{{ site.baseurl }}/U.html">U</a>
    <a href="{{ site.baseurl }}/V.html">V</a>
    <a href="{{ site.baseurl }}/W.html">W</a>
    <a href="{{ site.baseurl }}/X.html">X</a>
    <a href="{{ site.baseurl }}/Y.html">Y</a>
    <a href="{{ site.baseurl }}/Z.html">Z</a>
</div>

<h2>{{ letter }}</h2>

<div class="grid">
    {% for image in site.static_files %}
        {% assign filename = image.name | remove: '.jpg' %}
        {% assign first_char = filename | slice: 0 | upcase %}
        {% if image.path contains 'images' and first_char == letter %}
            <div>
                <p>{{ filename }}</p>
                <img src="{{ site.baseurl }}{{ image.path }}" alt="{{ image.name }}">
            </div>
        {% endif %}
    {% endfor %}
    </div>
    
    <script>
    document.querySelectorAll('.grid img').forEach(function(img) {
        img.addEventListener('click', function() {
            var expanded = document.createElement('div');
            expanded.classList.add('expanded');
            var bigImg = document.createElement('img');
            bigImg.src = img.src;
            expanded.appendChild(bigImg);
            document.body.appendChild(expanded);
            expanded.addEventListener('click', function() {
                expanded.remove();
            });
        });
    });
    </script>
'''

# The directory where the files should be created
# Replace this with the path to your Jekyll site
directory = 'E:/11. Py/SDXL Gallery/sdxl-gallery'

# Create an HTML file for each letter
for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
    with open(os.path.join(directory, f'{letter}.html'), 'w') as f:
        f.write(content)
