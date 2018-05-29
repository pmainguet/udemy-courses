//3 Parks and 4 streets. 

/*Final Report in console on:
PARK REPORT:
1. Tree density of each park in the town (nb of tree / park area)
2. Average age of town's park (sum of all ages / nb of park)
3. name of the park that has more than 1000 trees
STREETS REPORT
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal.
*/

var dataController = (function () {

    class TownElement {
        constructor(name, buildYear) {
            this.name = name,
                this.buildYear = buildYear
        }

        calculateAge(nowYear) {
            return nowYear - this.buildYear;
        }
    }

    class Park extends TownElement {
        constructor(name, buildYear, nbTree, parkArea) {
            super(name, buildYear);
            this.nbTree = nbTree;
            this.parkArea = parkArea;
        }

        calculateTreeDensity() {
            return this.nbTree / this.parkArea;
        }
    }

    class Street extends TownElement {
        constructor(name, buildYear, length, type = 'normal') {
            super(name, buildYear);
            this.length = length;
            this.type = type;
        }

        classifyStreet() {

            let classification = new Map();
            classification.set(10, 'tiny');
            classification.set(500, 'small');
            classification.set(2000, 'medium');
            classification.set(5000, 'big');

            for (let [key, value] of classification.entries()) {
                if (key >= this.length) {
                    this.type = value;
                    break;
                } else {
                    this.type = classification.get(5000);
                }
            }

            return this.type;
        }
    }

    let data = {
        allItems: {
            parks: [],
            streets: [],
        }
    }

    let initData = function () {
        data.allItems.parks.push(new Park("Green Park", 1962, 100, 250));
        data.allItems.parks.push(new Park("Main Park", 1906, 560, 600));
        data.allItems.parks.push(new Park("Hyde Park", 1986, 2500, 1000));

        data.allItems.streets.push(new Street("Queen Street", 1879, 5));
        data.allItems.streets.push(new Street("Sunset Boulevard", 1901, 1650));
        data.allItems.streets.push(new Street("Houston Street", 1950, 250));
        data.allItems.streets.push(new Street("Broadway Avenue", 1789, 6000));
        data.allItems.streets.push(new Street("Odd Avenue", 1789, 500));

    }

    return {
        initData: function () {
            initData();
        },
        getData: function () {
            return data;
        }
    }

})();

var mainController = (function (dataCtrl) {

    const data = dataCtrl.getData().allItems;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const limit = 1000;

    let sumFunction = array => array.reduce((acc, cur) => acc + cur);
    let averageFunction = array => Math.round(sumFunction(array) / array.length);

    class Report {
        constructor(date) {
            this.date = date;
            this.month = months[date.getMonth()];
            this.year = date.getFullYear();
        }

        displayTreeDensityParks() {
            const treeDensity = data.parks.map(cur => `${cur.name} has a tree density of ${cur.calculateTreeDensity().toFixed(2)}`);
            treeDensity.forEach(cur => console.log(cur));
        }

        calculateAverageAgeParks() {
            const ages = data.parks.map(cur => cur.calculateAge(this.date.getFullYear()));
            const averageAge = averageFunction(ages);
            return `${averageAge} years`;
        }

        findFirstParkAbove(limit) {
            return data.parks.find(cur => cur.nbTree >= limit).name;
        }

        displayLengthsStreets() {
            const lengths = data.streets.map(cur => cur.length)
            const totalLength = sumFunction(lengths);
            const averageLength = averageFunction(lengths);

            return [totalLength, averageLength];
        }

        displayStreets() {
            data.streets.forEach(cur => console.log(`${cur.name} has ${cur.length} meters and is a ${cur.classifyStreet()} street`));
        }
    }

    var displayReport = function () {

        let report = new Report(new Date());

        console.log(`REPORT FOR ${report.month}`);
        console.log('PARK REPORT:');
        console.log('1. Tree density of each park in the town:');
        report.displayTreeDensityParks();
        console.log(`2. Average age of town 's park: ${report.calculateAverageAgeParks()}`);
        console.log(`3. name of the park that has more than 1000 trees: ${report.findFirstParkAbove(limit)}`);
        console.log('STREETS REPORT');
        const [totalLength, averageLength] = report.displayLengthsStreets();
        console.log(`4. Total and average length of the town's streets: ${totalLength} meters and ${averageLength} meters`);
        console.log(`5. Size classification of all streets:`);
        report.displayStreets();
    }

    return {
        init: function () {
            console.log("Application has started");
            dataCtrl.initData();
            console.log("Data has been generated");
            displayReport();
        }
    }

})(dataController);

mainController.init();