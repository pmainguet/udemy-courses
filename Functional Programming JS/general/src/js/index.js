var h = require('hyperscript');
var R = require('ramda');

const data = [{
        id: 1,
        description: 'Breakfast',
        calories: 460
    },
    {
        id: 2,
        description: 'Lunch',
        calories: 520
    },
    {
        id: 3,
        description: 'Dinner',
        calories: 127
    },
];

const config = {
    node: document.querySelector('#app'),
    headers: ['Meal', 'Calories'],
}

//TABLE

const cell = (tag, className, value) => {
    return h(tag, {
        className
    }, value);
}

const tableHeader = (headers) => {
    return cell('thead', '',
        cell('tr', '', [
            cell('th', 'pa2 tl', headers[0]),
            cell('th', 'pa2 tr', headers[1])
        ])
    );
};

const tableBody = (data) => {
    return cell('tbody', '', data);
};

const tableRow = (classNames, data) => {
    return cell('tr', classNames, [
        cell('td', 'pa2', data.description),
        cell('td', 'pa2 tr', data.calories)
    ]);
}

const tableRows = (data) => {
    return R.map(R.partial(tableRow, ['stripe-dark']), data);
}

const tableFooter = (total) => {
    return cell('tfooter', '', cell('tr', '', [cell('td', 'pa2', 'Total: '), cell('td', 'pa2 tr', total)]));
}

const totalData = (data) => {
    return R.reduce((acc, e) => {
        return acc += e.calories
    }, 0, data);
}

const createTable = (classNames, data) => {
    return cell('table', classNames, [tableHeader(config.headers), R.pipe(tableRows, tableBody)(data), R.pipe(totalData, tableFooter)(data)]);
}

//PAGE
const templatePage = () => {
    const title = h('h1', 'Calorie Counter');
    const button = h('button', 'Add Meal');
    return cell('div', '', [title, button]);
}

const template = templatePage();
config.node.appendChild(template);
const view = createTable('table mw5 center w-100 collapse', data);
config.node.appendChild(view);