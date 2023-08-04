var images = Array.from(document.querySelectorAll('.grid img'));

function copyToClipboard(element) {
    var text = element.textContent || element.innerText;
    navigator.clipboard.writeText(text);
    }
images.forEach(function(img, index) {
    img.addEventListener('click', function() {
        var expanded = document.createElement('div');
        expanded.classList.add('expanded');

        var imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        expanded.appendChild(imageContainer);

        var bigImg = document.createElement('img');
        bigImg.src = img.src;
        imageContainer.appendChild(bigImg);

        var label = document.createElement('p');
        label.textContent = img.alt.replace('.jpg', '');
        label.style.position = 'absolute';
        label.style.top = '10px';
        label.style.left = '50%';
        label.style.transform = 'translateX(-50%)';
        label.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        label.style.padding = '5px';
        label.style.cursor = 'pointer';
        label.style.borderRadius = '3px';
        label.onclick = function() {
            copyToClipboard(label);
        };
        imageContainer.appendChild(label);

        var updateLabel = function(newIndex) {
            label.textContent = images[newIndex].alt.substring(0, images[newIndex].alt.length - 4);
        };

        var leftArrow = document.createElement('button');
        leftArrow.innerHTML = '&larr;';
        leftArrow.classList.add('left-arrow');
        leftArrow.addEventListener('click', function() {
            var prevIndex = (index - 1 + images.length) % images.length;
            bigImg.src = images[prevIndex].src;
            index = prevIndex;
            updateLabel(index);
        });
        imageContainer.appendChild(leftArrow);

        var rightArrow = document.createElement('button');
        rightArrow.innerHTML = '&rarr;';
        rightArrow.classList.add('right-arrow');
        rightArrow.addEventListener('click', function() {
            var nextIndex = (index + 1) % images.length;
            bigImg.src = images[nextIndex].src;
            index = nextIndex;
            updateLabel(index);
        });
        imageContainer.appendChild(rightArrow);

        document.body.appendChild(expanded);

        expanded.addEventListener('click', function(e) {
            if (e.target === expanded) {
                expanded.remove();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                var nextIndex = (index + 1) % images.length;
                bigImg.src = images[nextIndex].src;
                index = nextIndex;
                updateLabel(index);
            } else if (e.key === 'ArrowLeft') {
                var prevIndex = (index - 1 + images.length) % images.length;
                bigImg.src = images[prevIndex].src;
                index = prevIndex;
                updateLabel(index);
            }
        });
        bigImg.addEventListener('click', function() {
            expanded.remove();
        });
    });
});

function copyToClipboard(element) {
    var text = element.innerText;
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    //alert('Copied "' + text + '" to clipboard');
}

window.onscroll = function() {
    var button = document.getElementById('back-to-top');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
};

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

    function searchArtist() {
        var input = document.getElementById('search-bar').value.toLowerCase();
        var gridDiv = document.querySelector('.grid');
    
        // Only proceed if at least 3 characters are entered
        if (input.length < 3) {
            // Show all artists if less than 3 characters are entered
            gridDiv.querySelectorAll('div').forEach(function(div) {
                div.style.display = 'block';
            });
            return;
        }
    
        gridDiv.querySelectorAll('div').forEach(function(div) {
            var artistName = div.id.toLowerCase();
            if (artistName.includes(input)) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });
    }
    
    
    