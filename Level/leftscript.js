
function showInputDialog() {
    var inputOptions = document.getElementById("input-options");
    inputOptions.style.display = "block";
    hideBottomSection();
}


function hideBottomSection() {
    var bottomSection = document.getElementById("bottom");
    bottomSection.style.display = "none";
    

}

function showBottomSection() {
    var bottomSection = document.getElementById("bottom");
    bottomSection.style.display = "block";
   
}


function splitContent() {
    var rowsInput = document.getElementById("rows");
    var columnsInput = document.getElementById("columns");
    var mergedRowsInput = document.getElementById("mergedRows");
    var mergedColumnsInput = document.getElementById("mergedColumns");

    var rows = parseInt(rowsInput.value);
    var columns = parseInt(columnsInput.value);
    var mergedRows = parseInt(mergedRowsInput.value);
    var mergedColumns = parseInt(mergedColumnsInput.value);


    rows = (isNaN(rows) || rows <= 0) ? 1 : rows;
    columns = (isNaN(columns) || columns <= 0) ? 1 : columns;
    mergedRows = (isNaN(mergedRows) || mergedRows <= 0) ? 0 : mergedRows; 
    mergedColumns = (isNaN(mergedColumns) || mergedColumns <= 0) ? 0 : mergedColumns; 

    var inputOptions = document.getElementById("input-options");
    inputOptions.style.display = "none";

    var content = document.getElementById("content");
    content.innerHTML = "";

    content.style.display = "grid";
    content.style.gridTemplateRows = `repeat(${rows + mergedRows}, 1fr)`;
    content.style.gridTemplateColumns = `repeat(${columns + mergedColumns}, 1fr)`;

    for (let i = 0; i < (rows + mergedRows) * (columns + mergedColumns); i++) {
        var cell = document.createElement("div");
        cell.classList.add("cell");
        content.appendChild(cell);
    }
  
    showBottomSection();
}



function drag(event, elementType) {
    event.dataTransfer.setData("elementType", elementType);


}

function allowDrop(event) {
    event.preventDefault();
}




function drop(event) {
    event.preventDefault();
    var elementType = event.dataTransfer.getData("elementType");
    var content = document.getElementById("content");

    if (elementType === "textbox" || elementType === "button") {
        var element;

        if (elementType === "textbox") {
            element = document.createElement("input");
            element.type = "text";
            element.placeholder = "Enter text...";
            element.classList.add("floating-textbox");
        } else if (elementType === "button") {
            element = document.createElement("button");
            element.classList.add("curve", "small");
           
        }

        element.style.position = "absolute";
        element.style.left = (event.clientX - content.getBoundingClientRect().left) + "px";
        element.style.top = (event.clientY - content.getBoundingClientRect().top) + "px";

        element.draggable = true;

        element.ondragstart = function (event) {
            drag(event, elementType);
        };
        element.onmousedown = function (event) {
            moveElement(event, element);
        };

        content.appendChild(element);
        showBottomSection();
    }
    else if (elementType === "checkbox") {
       
        var content = document.getElementById("content");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("floating-checkbox");
        checkbox.style.position = "absolute";
        checkbox.style.left = (event.clientX - content.getBoundingClientRect().left) + "px";
        checkbox.style.top = (event.clientY - content.getBoundingClientRect().top) + "px";

        content.appendChild(checkbox);
        showBottomSection();
    }
     else if (elementType === "radio") {
      
        var content = document.getElementById("content");
        var radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.classList.add("floating-radiobutton");
        radioButton.style.position = "absolute";
        radioButton.style.left = (event.clientX - content.getBoundingClientRect().left) + "px";
        radioButton.style.top = (event.clientY - content.getBoundingClientRect().top) + "px";

        content.appendChild(radioButton);
        showBottomSection();
    }
    else if (elementType === "dropdown") {
        var content = document.getElementById("content");
        var dropdown = document.createElement("select");
        dropdown.classList.add("floating-dropdown");
        dropdown.style.position = "absolute";
        dropdown.style.left = (event.clientX - content.getBoundingClientRect().left) + "px";
        dropdown.style.top = (event.clientY - content.getBoundingClientRect().top) + "px";

     
        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        for (var i = 0; i < days.length; i++) {
            var option = document.createElement("option");
            option.text = days[i];
            dropdown.add(option);
        }
         content.appendChild(dropdown);
        showBottomSection();
    }


    else if (elementType === 'navButton') {
       
        var navButton = document.createElement("button");
        navButton.id = "navButton"; 
        navButton.innerHTML = "Navigation"; 
        navButton.draggable = true;
        navButton.ondragstart = function (event) {
            drag(event, 'navButton');
        };
        content.appendChild(navButton);
        showBottomSection();
    } 
}

function moveElement(event, element) {
    var offsetX = event.clientX - element.getBoundingClientRect().left;
    var offsetY = event.clientY - element.getBoundingClientRect().top;

    document.onmousemove = function (event) {
        element.style.left = event.clientX - offsetX + "px";
        element.style.top = event.clientY - offsetY + "px";
    };

    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}


function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
});

document.addEventListener("contextmenu", function (event) {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
    event.preventDefault();
});


function openTextSettingsModal() {
    var modal = document.getElementById("textSettingsModal");
    var overlay = document.getElementById("modalOverlay");
    modal.style.display = "block";
    overlay.style.display = "block";
}


function closeTextSettingsModal() {
    var modal = document.getElementById("textSettingsModal");
    var overlay = document.getElementById("modalOverlay");
    modal.style.display = "none";
    overlay.style.display = "none";
}


function applyTextStyles() {
    var fontSize = document.getElementById("fontSize").value + "px";
    var isBold = document.getElementById("fontStyle").value.includes("bold");
    var isItalic = document.getElementById("fontStyle").value.includes("italic");
    var isUnderline = document.getElementById("fontStyle").value.includes("underline");
    var color = document.getElementById("fontColor").value;

    document.execCommand("fontSize", false, fontSize);
    document.execCommand("bold", false, isBold);
    document.execCommand("italic", false, isItalic);
    document.execCommand("underline", false, isUnderline);
    document.execCommand("foreColor", false, color);

    closeTextSettingsModal();
}


//dropbdown


function applyDropdownOptions() {
    var dropdownConfigInput = document.getElementById("dropdownConfig");
    var dropdownConfig = dropdownConfigInput.value;


    var options = dropdownConfig.split(",");

    if (options.length < 2) {
        alert("Invalid input. Please provide the number of options and their names separated by a comma.");
        return;
    }

    var numOptions = parseInt(options[0]);
    var optionNames = options.slice(1);

    var defaultDropdown = document.getElementById("defaultDropdown");

    
    defaultDropdown.innerHTML = "";

    if (numOptions > 0) {
        for (var i = 0; i < numOptions; i++) {
            var option = document.createElement("option");
            option.text = optionNames[i] || "Option " + (i + 1);
            defaultDropdown.add(option);
        }
    }
    

    var originalDropdown = document.getElementById("content").querySelector("select.floating-dropdown");
    if (originalDropdown) {
        originalDropdown.innerHTML = defaultDropdown.innerHTML;
    }

    closeDropdownSettingsModal();
}



//clear

function clearContent() {
    var content = document.getElementById("content");
    content.innerHTML = "";
    hideBottomSection();
}

//preview

document.getElementById("previewButton").addEventListener("click", function () {
   
    var previewWindow = window.open('', '_blank');

 
    var contentToPreview = document.getElementById("content").outerHTML;

    var previewDocument = previewWindow.document;

    previewDocument.open();
    previewDocument.write('<html><head><title>Preview</title></head><body>' + contentToPreview + '</body></html');
    previewDocument.close();

    previewWindow.addEventListener('resize', function () {
        
    });
});


//image

document.getElementById("imageInput").addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.style.position = "absolute"; 
            image.style.left = "0px";
            image.style.top = "0px";

            var initialSize = "10%";
            image.style.width = initialSize;
            image.style.height = "auto"; 

            interact(image)
                .draggable({
                    listeners: {
                        start(event) {
                            
                        },
                        move(event) {
                            var target = event.target;
                            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                            target.setAttribute('data-x', x);
                            target.setAttribute('data-y', y);
                        },
                        end(event) {
                            
                        },
                    }
                })
                .resizable({
                    edges: { left: true, right: true, bottom: true, top: true },
                    listeners: {
                        move(event) {
                            var target = event.target;
                            var x = (parseFloat(target.getAttribute('data-x')) || 0);
                            var y = (parseFloat(target.getAttribute('data-y')) || 0);

                            var width = event.rect.width;
                            var height = event.rect.height;

                            target.style.width = width + 'px';
                            target.style.height = height + 'px';

                            target.setAttribute('data-x', x);
                            target.setAttribute('data-y', y);
                        },
                    }
                });

            content.appendChild(image);
        };

        reader.readAsDataURL(file);
    }
});


function openImageDialog() {
    var imageInput = document.getElementById("imageInput");
    imageInput.click();
}

function openNavSettings() {
    var navSettingsModal = document.getElementById("navSettingsModal");
    navSettingsModal.style.display = "block";
}

function closeNavSettings() {
    var navSettingsModal = document.getElementById("navSettingsModal");
    navSettingsModal.style.display = "none";
}

function applyNavSettings() {
    var navId = document.getElementById("navId").value;
    var navLink = document.getElementById("navLink").value;

    var content = document.getElementById("content");

    var navContainer = document.createElement("div");
    navContainer.classList.add("nav-element", "draggable"); 

    // Create a <span> element to hold ID
    var idElement = document.createElement("span");
    idElement.classList.add("nav-info", "draggable"); 
    idElement.innerText = navId;

    
    var linkElement = document.createElement("span");
    linkElement.classList.add("nav-info", "draggable"); 

    var linkAnchor = document.createElement("a");
    linkAnchor.href = navLink;
    linkAnchor.target = "_blank";
    linkAnchor.innerText = navLink;


    linkAnchor.addEventListener("mouseover", function () {
        // Change cursor to a hand when hovering over the link
        linkAnchor.style.cursor = "pointer";
    });

    linkAnchor.addEventListener("click", function (e) {
        e.preventDefault();
        window.open(navLink, "_blank");
    });

    linkElement.appendChild(linkAnchor);

    navContainer.appendChild(idElement);
    navContainer.appendChild(linkElement);

    navContainer.setAttribute("draggable", "true");
    navContainer.style.position = "absolute";
    navContainer.style.left = "0";
    navContainer.style.top = "0";

    interact(navContainer)
        .draggable({
            listeners: {
                start(event) {
                    event.target.classList.add('dragging');
                },
                move(event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                end(event) {
                    event.target.classList.remove('dragging');
                },
            }
        });

    content.appendChild(navContainer);
}

//Table

function createTable() {
    var numRows = parseInt(document.getElementById("numRows").value);
    var numCols = parseInt(document.getElementById("numCols").value);
    var colHeaders = document.getElementById("colHeaders").value.split(',');

    var content = document.getElementById("content");

  
    var table = document.createElement("table");
    table.style.border = "1px solid black";

   
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");

    for (var i = 0; i < numCols; i++) {
        var th = document.createElement("th");
        th.innerText = colHeaders[i] || ''; 
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

   
    var tbody = document.createElement("tbody");

    for (var i = 0; i < numRows; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < numCols; j++) {
            var cell = document.createElement("td");
            cell.innerText = ''; 
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    table.setAttribute("border", "1");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "5");
    content.appendChild(table);
        table.id = "draggableTable";

    content.appendChild(table);
    makeTableInteractive();

}

function makeTableInteractive() {
   
    var table = document.getElementById("draggableTable");

   
    interact(table).draggable({
        listeners: {
            move: function (event) {
                var target = event.target;
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
        },
    });

   
    interact(table).resizable({
        edges: { left: true, right: true, top: true, bottom: true },
        listeners: {
            move: function (event) {
                var target = event.target;
                var x = (parseFloat(target.getAttribute('data-x')) || 0);
                var y = (parseFloat(target.getAttribute('data-y')) || 0);

                // Update the width and height of the table
                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
        },
    });
}

