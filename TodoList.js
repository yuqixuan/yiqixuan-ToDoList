//用时间戳作为localStorage的key，然后巧妙的将时间戳置为button的id，
//这样可以通过button的id得到key,然后进行下一步处理。
//将复选框的id分成两种，一种是ul3,一种是ul4。方便识别localStorage存储的li是属于哪个ul的。
//要注意的就是input框的value值不要通过obj.value==xxx来修改设置，这样并没有真正修改input内部value值，
//并且localStorage并不会存储这样的value,可以通过JQuery中attr属性方法来设置value。
//通过js设置classs属性时，得通过obj.className=xxx来设置
var count = 0;
var sum = 0;
var badge1 = document.getElementById('badge1');
var badge2 = document.getElementById('badge2');
var localStorage = window.localStorage;
// 初始化时通过读取localStorage里面的值显示历史ToDoList
window.onload = function () {
    // 遍历localStorage
    for (let i = 0; i < localStorage.length; i++) {
        var li3 = document.createElement('div');
        var key = localStorage.key(i);
        //取出来的li节点是字符串，先将它用innerHTML插入到一个空白的div里面，然后取这个div的子节点得到li节点
        var value = localStorage.getItem(key);
        if (typeof (value) == "string") {
            li3.innerHTML = value;
        }
        //得到li节点
        var li4 = li3.firstElementChild;
        //得到li节点的一个子节点，也就是复选框，通过复选框的id值判断该任务是已完成还是未完成
        var li5 = li4.firstElementChild;
        //未完成
        if (li5.id == "ul3") {
            count++
            ul1.appendChild(li4);
        }
        //已完成
        else if (li5.id == "ul4") {
            li5.checked = true;
            ul2.appendChild(li4);
        }
        //为复选框添加监听事件
        var li5 = li4.firstElementChild;
        li5.addEventListener('click', f1);
        //为按钮添加监听事件
        var li6 = li4.lastElementChild;
        li6.addEventListener('click', f2);
        //将值传给徽章
        sum = localStorage.length;
        badge1.innerHTML = count;
        badge2.innerHTML = sum - count;
    }
};
//当输入框出现键盘弹起事件触发该函数，
function input(event) {
    var input = document.getElementById('input');
    //如果为空，不添加任务
    if (input.value == "") {
        alert('ToDo不能为空');
    }
    // 如果不为空，那么添加任务
    else if (event.keyCode == 13) {
        //纠正徽章值
        count++;
        sum++;
        badge1.innerHTML = count;
        badge2.innerHTML = sum - count;
        //获取添加的任务值
        var value = document.getElementById('input').value;
        //第一第二个ul节点
        var ul1 = document.getElementById('ul1');
        var ul2 = document.getElementById('ul2');
        //创造 li节点，以及li节点所包含的节点
        var li = document.createElement('li');
        var input = document.createElement('input');
        var input2 = document.createElement('input');
        var h5 = document.createElement('h5');
        var input3 = document.createElement('input');
        // 给创造的节点添加属性，注意：添加class属性得通过className,
        // 添加value属性得通过JQuery库中的attr属性方法，不能直接用value，
        // 要不然不能改变input内部value值，只是改变了前端看的见的值而已，并且localStorage里面存储不了直接通过value修改值
        input.type = 'checkbox';
        input.id = 'ul3';
        input.className = 'radio';
        //为复选框增加监听事件
        input.addEventListener('click', f1);
        input2.type = 'text';
        // input2.value = value;
        input2.className = 'input2';
        $(input2).attr("value", value);
        h5.className = 'date';
        h5.id = 'date';
        //获取当前时间
        var date = document.getElementById('date');
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        //得到时间戳，方便设置localStorage的key值
        var time = now.getTime();
        //将时间拼凑起来，得到想要的时间表达式
        var str = year + '-' + month + '-' + day + " " + hour + ":" + minute;
        h5.innerHTML = str;
        input3.type = 'button';
        input3.value = 'Delete';
        input3.className = 'button';
        input3.id = time;
        //按钮添加监听事件
        input3.addEventListener('click', f2);
        //把所有li里面的节点添加到li里面去，然后把li添加到第一个ul里面
        li.appendChild(input);
        li.appendChild(input2);
        li.appendChild(h5);
        li.appendChild(input3);
        //按回程后将输入框的值置为空
        document.getElementById('input').value = "";
        //将节点转化为字符串存储到localStorage里面，时间戳为key值
        var li2 = document.createElement('div');
        li2.appendChild(li);
        var str2 = li2.innerHTML;
        localStorage.setItem(time, str2);
        //目前不清楚为啥这行代码要放到localStorage后面，如果放到106行不会起作用
        ul1.appendChild(li);
    }
};
//复选框监听调用的函数
function f1(e) {
    //获取当前复选框节点
    var target = e.currentTarget;
    var parent = target.parentElement;
    var grandParent = parent.parentElement;
    var ul = grandParent.id;
    var button = parent.lastElementChild;
    //得到localStorage中的key，也就是时间戳
    var key = button.id;
    //得到localStorage中的value
    var value = localStorage.getItem(key);

    if (ul == 'ul1') {
        ul1.removeChild(parent);
        ul2.appendChild(parent);

        //将字符串转换为节点
        var li3 = document.createElement('div');
        if (typeof (value) == "string") {
            li3.innerHTML = value;
        }
        var li4 = li3.firstElementChild;
        var li5 = li4.firstElementChild;
        li5.id = "ul4";

        //将节点转换为字符串
        var li2 = document.createElement('div');
        li2.appendChild(li4);
        var str2 = li2.innerHTML;
        localStorage.setItem(key, str2);

        count--;
        badge1.innerHTML = count;
        badge2.innerHTML = sum - count;
    } else if (ul == 'ul2') {
        ul2.removeChild(parent);
        ul1.appendChild(parent);

        //将字符串转换为节点
        var li3 = document.createElement('div');
        if (typeof (value) == "string") {
            li3.innerHTML = value;
        }
        var li4 = li3.firstElementChild;
        var li5 = li4.firstElementChild;
        li5.id = "ul3";

        //将节点转换为字符串
        var li2 = document.createElement('div');
        li2.appendChild(li4);
        var str2 = li2.innerHTML;
        localStorage.setItem(key, str2);

        count++;
        badge1.innerHTML = count;
        badge2.innerHTML = sum - count;
    }
}
//按钮监听调用的函数
function f2(e) {
    var target = e.currentTarget;
    var parent = target.parentElement;
    var grandParent = parent.parentElement;
    var key = target.id;
    //点击删除按钮后，将该按钮对应的时间戳取出来，然后通过removeItem函数删除掉
    localStorage.removeItem(key);
    if (grandParent.id == 'ul1') {
        count--;
        sum--;
        badge1.innerHTML = count;
    } else if (grandParent.id == 'ul2') {
        sum--;
        badge2.innerHTML = sum - count;
    };
    grandParent.removeChild(parent);
}