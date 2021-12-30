		var codeTag = {
			script: ["var", "=", "==", ">", "||", "&&", "<", "[]", '""', "{}", "()", "function", "for", "alert", "prompt", "if", "else", "console.log", "while", "document", "getElementById", ";", "value", "innerHTML", "onclick", "this", "prototype", "new", "class", "$()"],
			style: ["color", "red", "#", "margin", "px", "padding", ":", ";", "borde", "black", "green", "borde-radius", ".", "solid", "font-size", "font-family", "float", "background"],
			html: ["<", "/", "html", "body", "head", "title", "meta", "p", "h1", "h2", "h3", "h4", "h5", "h6", "script", "br", "style", ">", 'style=""', 'id=""', 'class=""', 'onclick=""', 'charset="utf-8"', "!DOCTYPE html", 'href=""', 'rel=""'],
			py: ["=", "print", "()", "in", "input", "for", "while", "[]", ":", "def", "import", "from", "if", "else", "elif", '""', "%", "import", "from", "*"]
		};

		codeTag.js = codeTag.script;
		codeTag.css = codeTag.style;

		function saveCode() {
			var text1 = localStorage.filesCodeText.split("#CodeMeker#");
			text1[id] = $("#text").val();
			localStorage.filesCodeText = text1.join("#CodeMeker#");
		}

		function textSmelTeg() {
			var oMsgInput = document.getElementById("text"), mass = Object.keys(codeTag), nSelStart = oMsgInput.selectionStart, Text = oMsgInput.value;
			for(var i = mass.length; i >= 0; i--) {
				if (Text.slice(0, nSelStart).indexOf(mass[i]) != -1 || $("#file-name").text().indexOf(mass[i]) != -1){
					$("#list").remove();
					$("#tool-is").append('<div id="list"></div>');
					for (var x = codeTag[mass[i]].length-1; x >= 0; x--){
						if (codeTag[mass[i]][x].indexOf(Text[nSelStart-1]) != -1){
							$("#list").append('<qcss-button left>' + codeTag[mass[i]][x] + "</qcss-button>");
						} 
					}
					console.log(mass[i]);
				}
			}
		}

		function insertMetachars(sStartTag, sEndTag) {
 			var bDouble = arguments.length > 1, oMsgInput = document.getElementById("text"), nSelStart = oMsgInput.selectionStart, nSelEnd = oMsgInput.selectionEnd, sOldText = oMsgInput.value;
 			oMsgInput.value = sOldText.substring(0, nSelStart) + (bDouble ? sStartTag + sOldText.substring(nSelStart, nSelEnd) + sEndTag : sStartTag) + sOldText.substring(nSelEnd);
  			oMsgInput.setSelectionRange(bDouble || nSelStart === nSelEnd ? nSelStart + sStartTag.length : nSelStart, (bDouble ? nSelEnd : nSelStart) + sStartTag.length);
  			oMsgInput.focus();
		}

		if (document.URL.indexOf("codeQR") != -1) {
			var code = decodeURI(document.URL.slice(document.URL.indexOf("codeQR") + 7)).split(":CodeMaker:");
			if(localStorage.filesCode.indexOf(code[0]) == -1) {
				localStorage.filesCode += "#CodeMeker#" + code[0];
				localStorage.filesCodeText += "#CodeMeker#" + code[1];
				window.location.reload();
			}
		}

		$("#edit").hide();
		$("#share-gui").hide();
		$("#tool-is").hide();
		$("#run-menu").hide();

		if(localStorage.filesCode == undefined) {
			localStorage.filesCode = "";
		}
		if(localStorage.filesCodeText == undefined) {
			localStorage.filesCodeText = "";
		}

		var files = localStorage.filesCode.split("#CodeMeker#");
		var text = localStorage.filesCodeText.split("#CodeMeker#");
		var id = "";

		for(var i = files.length - 1; i > 0; i--) {
			$("#files").append('<qcss-button id="' + i + '">' + files[i] + "</qcss-button>");
			$("#" + i).click(function() {
				$("#edit").show();
				$("#files").hide();

				var name = $(this).text();
				id = $(this).attr("id");

				$("#file-name").text(name);
				$("#download").attr("download", name);
				$("#text").val(text[id]);

				$("#tool-is").show();
			});
		}

		$("#new").click(function() {
			var name = prompt("File name (Название файла)(index.html, css.css):");
			localStorage.filesCode += "#CodeMeker#" + name;
			localStorage.filesCodeText += "#CodeMeker#" + name;
			window.location.reload();
		});
		$("#delete").click(function() {
			if (confirm("Are you sure you want to delete everything?(Вы точно хотите удалить все?)")) {
				localStorage.filesCode = "";
				localStorage.filesCodeText = "";
				window.location.reload();
			}
		});

		$("#text").bind('input', function() {
			saveCode();
			textSmelTeg();
		});
		$("#text").click(textSmelTeg);

		$("#download").click(function() {
			var text = "data:text/html," + $("#text").val();
			$("#download").attr("href", text);
		});
		$("#tool-is").click(function(e) {
			var teg = $(e.originalEvent.target);
			if(teg.text().indexOf("Code") == -1 && teg.attr("id") != "list") {
				insertMetachars(teg.text().slice(1, teg.text().length));
			}
			saveCode();
		});
		$("#run").click(function() {
			var text = "data:text/html," + $("#text").val();
			$("#iframe-run").attr("src", text);
			$("#run-menu").show();
			$("#edit").hide();
			$("#tool-is").hide();
		});
		$("#share").click(function() {
			$("#share-gui").show();
			$("#edit").hide();
			$("#tool-is").hide();
			var url = document.URL + "?codeQR=" + $("#file-name").text() + ":CodeMaker:" + $("#text").val();
			url = encodeURI(url);
			$("#url").val(url);
		});
		$("#button-ok").click(function() {
			window.location.reload();
		});
		$("#button-ok-next").click(function() {
			window.location.reload();
		});
		$("#button-edit-run").click(function() {
			$("#run-menu").hide();
			$("#edit").show();
			$("#tool-is").show();
		});

		function readFile(input) {
  			let file = input.files[0];

  			let reader = new FileReader();

  			reader.readAsText(file);

  			reader.onload = function() {
    			localStorage.filesCode += "#CodeMeker#" + file.name;
				localStorage.filesCodeText += "#CodeMeker#" + reader.result;

				window.location.reload();
  			};
		}