var jsonTree = [];

function getTreeData() {

	return jsonTree;

}
function addNode(node) {

	var x = "";
	x = jsonTree.concat(node);
	jsonTree = x;

}
function include(arr, obj) {
	return (arr.indexOf(obj) != -1);
}
function loadData() {
	var added = new Array();
	$.each(data.links, function(i, v) {

		var node = v.label;
		var split = node.split(",");
		for (i = 0; i < split.length; i++) {
			if (!include(added, split[i].trim())) {

				{
					addNode(split[i].trim());
					added[added.length] = split[i].trim();
				}

			}

		}
	});
	// addNode(data);
	// addNode(data1);

}

function searchLabel(key) {
	//alert(key);
	var divID = document.getElementById("resCont");
	divID.innerHTML = "";
	var count = 0;
	$.each(data.links, function(i, v) {

		var split = v.label.split(",");

		for (i = 0; i < split.length; i++) {

			if (split[i].trim() == key) {
				var newWrap = document.createElement("div");
				var newdiv = document.createElement("div");
				var textDiv = document.createTextNode(v.text);
				var newLink = document.createElement("a");
				var pickText = document.createTextNode(v.url);
				var newTag = document.createElement("div");
				var textTag = document.createTextNode("tags: " + v.label);
				newLink.appendChild(pickText);
				newLink.setAttribute('href', v.url);
				newLink.setAttribute('target', "_blank");
				newdiv.appendChild(textDiv);
				newTag.appendChild(textTag);
				newTag.setAttribute("class", "tagList");
				newWrap.appendChild(newdiv);
				newWrap.appendChild(newTag);
				newWrap.appendChild(newLink);
				count++;
				//alert(count);
				if (count % 2 == 0)
					newWrap.setAttribute("class", "oddSearch");
				else
					newWrap.setAttribute("class", "evenSearch");
				divID.appendChild(newWrap);

				return;
			}
		}
	});
}

