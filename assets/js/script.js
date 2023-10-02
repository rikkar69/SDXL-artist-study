var images = Array.from(document.querySelectorAll('.grid img'));

//copy to clipboard and expanded image with navigation
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
            } else if (e.key === 'Escape') {  // Check if the 'Esc' key is pressed
                expanded.remove();  // Close the image preview
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

//scroll to top button
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

function removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

//filter results with search
function searchArtist() {
    var input = removeDiacritics(document.getElementById('search-bar').value.toLowerCase().trim());
    var gridDiv = document.querySelector('.grid');
    var clearIcon = document.getElementById('clear-icon');

    // Show or hide the "x" icon based on input length
    if (input.length > 0) {
        clearIcon.style.display = 'inline';
    } else {
        clearIcon.style.display = 'none';
    }
        // Only proceed if at least 3 characters are entered
    if (input.length < 3) {
            // Show all artists if less than 3 characters are entered
        gridDiv.querySelectorAll('div').forEach(function(div) {
             div.style.display = 'block';
            });
        return;
        }
    
        gridDiv.querySelectorAll('div').forEach(function(div) {
            var artistName = removeDiacritics(div.id.toLowerCase());
            if (artistName.includes(input)) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });
    }

function clearSearch() {
    var searchBar = document.getElementById('search-bar');
    var clearIcon = document.getElementById('clear-icon');
        
    searchBar.value = '';
    clearIcon.style.display = 'none';
        
    // Optionally, show all artists again
    var gridDiv = document.querySelector('.grid');
    gridDiv.querySelectorAll('div').forEach(function(div) {
        div.style.display = 'block';
        });
}

// Grab the search bar element
var searchBar = document.getElementById('search-bar');

// Add the event listener
searchBar.addEventListener('keydown', function(event) {
    // Check if the 'Escape' key was pressed
    if (event.key === 'Escape') {
        // Clear the search input
        searchBar.value = '';
        
        // Clear the results or reset the view (you can call your clearSearch function)
        clearSearch();
    }
});

// Artist counter function
async function getImageCount() {
    const response = await fetch('assets/image_count.txt');
    const count = await response.text();
    return count;
  }
  
  getImageCount().then(count => {
    document.getElementById('number-of-artists').textContent = count;
  });  
    