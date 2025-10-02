let todo_list = document.getElementById("todo_list"); // 获取主列表
let todo_item = document.getElementsByClassName("todo_item"); // 获取列表的
const save_button = document.getElementById("save");


/**
* @brief  以下载的形式导出一个文件
* @param  content 文件中要写入的内容
* @param  file_name 文件名（注意要有后缀名）
*/
function save(content = "", file_name = "") {
	const blob = new Blob([content], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = file_name;
	a.click();
}

// 给“保存”按钮绑定“save”函数
// save_button.onclick = save;

// 给“读取”按钮绑定函数
document.getElementById('fileInput').addEventListener('change', function (e) {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = function (e) {
		console.log(e.target.result); // 文件内容
	};
	reader.readAsText(file); // 以文本形式读取
});











// 将“待办事项”变成“待办事项*”以彰显其未被保存
