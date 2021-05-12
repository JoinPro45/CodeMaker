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
		$("tool-is").hide();

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

				$("tool-is").show();
			});
		}

		$("#new").click(function() {
			var name = prompt("Название файла(index.html, css.css):");
			localStorage.filesCode += "#CodeMeker#" + name;
			localStorage.filesCodeText += "#CodeMeker#" + name;
			window.location.reload();
		});
		$("#delete").click(function() {
			 localStorage.filesCode = "";
			 localStorage.filesCodeText = "";
			 window.location.reload();
		});

		$("#text").bind('input', function() {
			var text1 = localStorage.filesCodeText.split("#CodeMeker#");
			text1[id] = $("#text").val();
			localStorage.filesCodeText = text1.join("#CodeMeker#");
		});
		$("#download").click(function() {
			var text = "data:text/html," + $("#text").val();
			$("#download").attr("href", text);
		});
		$("#run").click(function() {
			var text = "data:text/html," + $("#text").val();
			prompt("URL:", text);
		});
		$("#share").click(function() {
			$("#share-gui").show();
			$("#edit").hide();
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
		$("tool-is").click(function(e) {
			var teg = $(e.toElement).text();
			console.log(teg);
			if(teg.indexOf(" ") == -1) {
				insertMetachars(teg);
			}
		});
