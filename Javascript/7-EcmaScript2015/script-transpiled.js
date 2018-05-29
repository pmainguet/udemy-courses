'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var dataController = function () {
    var TownElement = function () {
        function TownElement(name, buildYear) {
            _classCallCheck(this, TownElement);

            this.name = name, this.buildYear = buildYear;
        }

        _createClass(TownElement, [{
            key: 'calculateAge',
            value: function calculateAge(nowYear) {
                return nowYear - this.buildYear;
            }
        }]);

        return TownElement;
    }();

    var Park = function (_TownElement) {
        _inherits(Park, _TownElement);

        function Park(name, buildYear, nbTree, parkArea) {
            _classCallCheck(this, Park);

            var _this = _possibleConstructorReturn(this, (Park.__proto__ || Object.getPrototypeOf(Park)).call(this, name, buildYear));

            _this.nbTree = nbTree;
            _this.parkArea = parkArea;
            return _this;
        }

        _createClass(Park, [{
            key: 'calculateTreeDensity',
            value: function calculateTreeDensity() {
                return this.nbTree / this.parkArea;
            }
        }]);

        return Park;
    }(TownElement);

    var Street = function (_TownElement2) {
        _inherits(Street, _TownElement2);

        function Street(name, buildYear, length) {
            var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'normal';

            _classCallCheck(this, Street);

            var _this2 = _possibleConstructorReturn(this, (Street.__proto__ || Object.getPrototypeOf(Street)).call(this, name, buildYear));

            _this2.length = length;
            _this2.type = type;
            return _this2;
        }

        _createClass(Street, [{
            key: 'classifyStreet',
            value: function classifyStreet() {

                var classification = new Map();
                classification.set(10, 'tiny');
                classification.set(500, 'small');
                classification.set(2000, 'medium');
                classification.set(5000, 'big');

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = classification.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2),
                            key = _step$value[0],
                            value = _step$value[1];

                        if (key >= this.length) {
                            this.type = value;
                            break;
                        } else {
                            this.type = classification.get(5000);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return this.type;
            }
        }]);

        return Street;
    }(TownElement);

    var data = {
        allItems: {
            parks: [],
            streets: []
        }
    };

    var _initData = function _initData() {
        data.allItems.parks.push(new Park("Green Park", 1962, 100, 250));
        data.allItems.parks.push(new Park("Main Park", 1906, 560, 600));
        data.allItems.parks.push(new Park("Hyde Park", 1986, 2500, 1000));

        data.allItems.streets.push(new Street("Queen Street", 1879, 5));
        data.allItems.streets.push(new Street("Sunset Boulevard", 1901, 1650));
        data.allItems.streets.push(new Street("Houston Street", 1950, 250));
        data.allItems.streets.push(new Street("Broadway Avenue", 1789, 6000));
        data.allItems.streets.push(new Street("Odd Avenue", 1789, 500));
    };

    return {
        initData: function initData() {
            _initData();
        },
        getData: function getData() {
            return data;
        }
    };
}();

var mainController = function (dataCtrl) {

    var data = dataCtrl.getData().allItems;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var limit = 1000;

    var sumFunction = function sumFunction(array) {
        return array.reduce(function (acc, cur) {
            return acc + cur;
        });
    };
    var averageFunction = function averageFunction(array) {
        return Math.round(sumFunction(array) / array.length);
    };

    var Report = function () {
        function Report(date) {
            _classCallCheck(this, Report);

            this.date = date;
            this.month = months[date.getMonth()];
            this.year = date.getFullYear();
        }

        _createClass(Report, [{
            key: 'displayTreeDensityParks',
            value: function displayTreeDensityParks() {
                var treeDensity = data.parks.map(function (cur) {
                    return cur.name + ' has a tree density of ' + cur.calculateTreeDensity().toFixed(2);
                });
                treeDensity.forEach(function (cur) {
                    return console.log(cur);
                });
            }
        }, {
            key: 'calculateAverageAgeParks',
            value: function calculateAverageAgeParks() {
                var _this3 = this;

                var ages = data.parks.map(function (cur) {
                    return cur.calculateAge(_this3.date.getFullYear());
                });
                var averageAge = averageFunction(ages);
                return averageAge + ' years';
            }
        }, {
            key: 'findFirstParkAbove',
            value: function findFirstParkAbove(limit) {
                return data.parks.find(function (cur) {
                    return cur.nbTree >= limit;
                }).name;
            }
        }, {
            key: 'displayLengthsStreets',
            value: function displayLengthsStreets() {
                var lengths = data.streets.map(function (cur) {
                    return cur.length;
                });
                var totalLength = sumFunction(lengths);
                var averageLength = averageFunction(lengths);

                return [totalLength, averageLength];
            }
        }, {
            key: 'displayStreets',
            value: function displayStreets() {
                data.streets.forEach(function (cur) {
                    return console.log(cur.name + ' has ' + cur.length + ' meters and is a ' + cur.classifyStreet() + ' street');
                });
            }
        }]);

        return Report;
    }();

    var displayReport = function displayReport() {

        var report = new Report(new Date());

        console.log('REPORT FOR ' + report.month);
        console.log('PARK REPORT:');
        console.log('1. Tree density of each park in the town:');
        report.displayTreeDensityParks();
        console.log('2. Average age of town \'s park: ' + report.calculateAverageAgeParks());
        console.log('3. name of the park that has more than 1000 trees: ' + report.findFirstParkAbove(limit));
        console.log('STREETS REPORT');

        var _report$displayLength = report.displayLengthsStreets(),
            _report$displayLength2 = _slicedToArray(_report$displayLength, 2),
            totalLength = _report$displayLength2[0],
            averageLength = _report$displayLength2[1];

        console.log('4. Total and average length of the town\'s streets: ' + totalLength + ' meters and ' + averageLength + ' meters');
        console.log('5. Size classification of all streets:');
        report.displayStreets();
    };

    return {
        init: function init() {
            console.log("Application has started");
            dataCtrl.initData();
            console.log("Data has been generated");
            displayReport();
        }
    };
}(dataController);

mainController.init();
