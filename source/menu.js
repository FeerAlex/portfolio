export default function (array, className) {
    var menu = document.createElement("ul"),
        listItems = '';

    menu.className = className;

    array.forEach(function(item) {
        listItems += "<li>" + item + "</li>";
    });

    menu.innerHTML = listItems;
    return menu;
}