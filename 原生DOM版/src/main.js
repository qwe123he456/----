// 获取各个DOM对象
let todo_list = document.getElementById("todo_list"); // 主列表
let save_button = document.getElementById("save"); // “保存”按钮
let input_box = document.getElementById("input_box"); // 输入框与添加按钮
let append_button = document.getElementById("append"); // “添加”按钮
let input_area = document.getElementById("input_area"); // 文字输入区
let todo_item = document.getElementsByClassName("todo_item"); // 主列表每一项形成的列表
let current_time = document.getElementById("current_time"); // 文字输入区

/** 以下载的形式导出一个文件
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

// 获取时间的函数
function get_time() {

	// 把一个数字变成双位数的函数
	function two_digits(num) {
		if ((0 <= num) && (num <= 9)) {
			return `0${num}`
		} else {
			return `${num}`;
		}
	}

	let d = new Date();
	let year = `${d.getFullYear()}`;
	let month = `${two_digits(d.getMonth() + 1)}`;
	let date = `${two_digits(d.getDate())}`;
	let hour = `${two_digits(d.getHours())}`;
	let minute = `${two_digits(d.getMinutes())}`;
	return `${year}/${month}/${date}/${hour}:${minute}`;
}

// 通过id来创建DOM对象的函数
function createElementById(input_id = "", element = "div") {
	let str = input_id;
	var input_id = document.createElement(element);
	input_id.id = `${str}`;
	return input_id;
}

// 通过class来创建DOM对象的函数
function createElementByClassName(input_class_name = "", element = "div") {
	let str = input_class_name;
	var input_class_name = document.createElement(element);
	input_class_name.className = `${str}`;
	return input_class_name;
}

/**获取样式的函数
 * @param element 被获取样式的标签
 * @param attribute 需获取的样式属性
*/
function getStyle(
	element = document.getElementById(),
	attribute = ""
) {
	if (window.getComputedStyle) {//如果浏览器是IE9+
		return getComputedStyle(element, null)[attribute];
	} else {//浏览器是IE8-
		return element.currentStyle[attribute];
	}
}




/** 增添列表项 
 * @param words 待办事项的文字
 */
function append(words = "") {

	// 获取时间
	let now = get_time();



	// 在最后一项的后面创建这一列表项对象

	// 创建对象们
	let state_button = createElementById("state_button", "button");
	let state_words = createElementById("state_words");
	let del_item = createElementById("del_item", "button");
	let buttons = createElementById("buttons");
	let controller = createElementById("controller");
	let todo_words = createElementById("todo_words");
	let time_record = createElementByClassName("time_record");
	let todo_item = createElementByClassName("todo_item");
	let x = createElementByClassName("x");
	// 为对象们添加属性
	state_button.className = "daiban";
	todo_words.innerHTML = words;
	time_record.innerHTML = now;
	state_words.innerHTML = "待办";
	x.innerHTML = "×";


	// 调整对象们之间的关系
	state_button.appendChild(state_words);
	del_item.appendChild(x);
	buttons.appendChild(state_button);
	buttons.appendChild(del_item);
	controller.appendChild(time_record);
	controller.appendChild(buttons);
	todo_item.appendChild(todo_words);
	todo_item.appendChild(controller);


	// 保证输入框与添加按钮在最下面
	todo_list.appendChild(todo_item);
	todo_list.appendChild(input_box);

	/* 为按钮们绑定响应函数 */
	// “删除”按钮
	x.onclick = () => {
		function del() {
			let con = 0;

			a = (offset) => {
				setTimeout(
					() => {
						let oldValue = getStyle(todo_item, "margin-left");
						todo_item.style["margin-left"] = (`${parseInt(oldValue) + offset / 50}px`);

						oldValue = getStyle(todo_item, "margin-right");
						todo_item.style["margin-right"] = (`${parseInt(oldValue) - offset / 50}px`);

						oldValue = getStyle(todo_item, "opacity");
						todo_item.style["opacity"] = oldValue - 0.02;

						con += offset / 50;
						con < offset ? a(offset) : todo_item.parentNode.removeChild(todo_item);
					}
					, 20
				);
			}
			a(500);


		}



		confirm(`确定要删除“${todo_words.innerHTML}”吗？`) ? del() : 0;
	}
	// 状态按钮切换
	state_button.onclick = () => {
		if (state_words.innerHTML == "待办") {
			state_words.innerHTML = "既办";
			state_button.className = "jiban";
		} else if (state_words.innerHTML == "既办") {
			state_words.innerHTML = "重要";
			state_button.className = "zhongyao";
		} else {
			state_words.innerHTML = "待办";
			state_button.className = "daiban";
		}

	}


	/* 清空文字输入区 */
	input_area.value = "";

}


// 给“保存”按钮绑定“save”函数
save_button.onclick = save;

// 给“读取”按钮绑定函数
document.getElementById('fileInput').addEventListener('change', function (e) {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = function (e) {
		console.log(e.target.result); // 文件内容
	};
	reader.readAsText(file); // 以文本形式读取
});

// 给“添加”按钮绑定函数
append_button.onclick = () => {
	input_area.value ? append(input_area.value) : alert("请输入内容后再添加");
}

// “添加”区的时间随时改变
setInterval(() => {
	current_time.innerHTML = get_time();
}, 1000)








// 将“待办事项”变成“待办事项*”以彰显其未被保存（或者修改“保存”为灰色状态等）
// 删除动画平滑化
// 可以通过拖动来调整列表项的顺序