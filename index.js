var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var employeeRate = {
    position: {
        engineer: { salary: 200, coffee: 5, payload: 50 },
        marketer: { salary: 400, coffee: 15, payload: 150 },
        manager: { salary: 500, coffee: 20, payload: 200 },
        analyst: { salary: 800, coffee: 50, payload: 5 }
    },
    rankMultiplier: {
        1: 1,
        2: 1.25,
        3: 1.5
    }
};
var calcSalary = function (department, employeeRate, employee) {
    var rankMultiplier = employeeRate.rankMultiplier[employee.rank];
    var salary = employeeRate.position[employee.position].salary;
    var totalSalary = salary * rankMultiplier;
    return employee.id === department.head.id ? totalSalary * 1.5 : totalSalary;
};
var calcCoffee = function (department, employeeRate, employee) {
    var coffee = employeeRate.position[employee.position].coffee;
    return employee.id === department.head.id ? coffee * 2 : coffee;
};
var calcPayload = function (department, employeeRate, employee) {
    var payload = employeeRate.position[employee.position].payload;
    return employee.id === department.head.id ? 0 : payload;
};
var calcStats = function (employeeRate, departments) {
    var aggregateDepartmentRow = function (department) {
        var employee = department.employee.concat([department.head]);
        var salary = employee.reduce(function (acc, emp) { return acc + calcSalary(department, employeeRate, emp); }, 0);
        var coffee = employee.reduce(function (acc, emp) { return acc + calcCoffee(department, employeeRate, emp); }, 0);
        var payload = employee.reduce(function (acc, emp) { return acc + calcPayload(department, employeeRate, emp); }, 0);
        if (payload === 0) {
            throw new Error('Division by zero');
        }
        return {
            title: department.title,
            count: employee.length,
            coffee: coffee,
            salary: salary,
            payload: payload,
            avg: parseFloat((salary / payload).toFixed(2))
        };
    };
    var stats = departments.map(aggregateDepartmentRow);
    var totals = stats.reduce(function (totals, row) {
        return {
            title: 'Totals',
            count: (totals.count || 0) + row.count,
            coffee: (totals.coffee || 0) + row.coffee,
            payload: (totals.payload || 0) + row.payload,
            salary: (totals.salary || 0) + row.salary,
            avg: parseFloat(((totals.avg || 0) + row.avg).toFixed(2))
        };
    }, {});
    var average = {
        title: 'Avg',
        count: totals.count / departments.length,
        coffee: totals.coffee / departments.length,
        payload: totals.payload / departments.length,
        salary: totals.salary / departments.length,
        avg: parseFloat((totals.salary / totals.payload).toFixed(2))
    };
    return stats
        .concat({})
        .concat(average)
        .concat(totals);
};
var antiCrisisMeasureFirst = function (departments) {
    return departments.map(function (department) {
        var canBeFired = function (employee) {
            return (employee.position === 'engineer' && employee.id !== department.head.id);
        };
        var matchingEngineers = department.employee
            .filter(canBeFired)
            .sort(function (left, right) { return left.rank - right.rank; });
        var engineersToFire = matchingEngineers
            .slice(0, Math.ceil(matchingEngineers.length * 0.4))
            .map(function (engineer) { return engineer.id; });
        return __assign({}, department, { employee: department.employee.filter(function (employee) { return engineersToFire.indexOf(employee.id) === -1; }) });
    });
};
var antiCrisisMeasureSecond = function (employeeRate, departments) {
    var updatedEmployeeRate = __assign({}, employeeRate, { position: __assign({}, employeeRate.position, { analyst: __assign({}, employeeRate.position.analyst, { salary: 1100, coffee: 75 }) }) });
    var updatedDepartments = departments.map(function (department) {
        var analysts = department.employee
            .filter(function (employee) { return employee.position === 'analyst'; })
            .sort(function (left, right) { return right.rank - left.rank; });
        if (analysts.length) {
            return __assign({}, department, { head: analysts[0], employee: department.employee
                    .filter(function (employee) { return employee.id !== analysts[0].id; })
                    .concat(department.head) });
        }
        return department;
    });
    return [updatedEmployeeRate, updatedDepartments];
};
var antiCrisisMeasureThird = function (departments) {
    var canBePromoted = function (employee) {
        return (employee.position === 'manager' &&
            (employee.rank === 1 || employee.rank === 2));
    };
    return departments.map(function (department) {
        var matchingManagers = department.employee.concat([department.head]).filter(canBePromoted);
        var managersToPromote = matchingManagers
            .slice(0, Math.ceil(matchingManagers.length * 0.5))
            .map(function (manager) { return manager.id; });
        var tryPromote = function (employee) {
            return __assign({}, employee, { rank: managersToPromote.indexOf(employee.id) === -1
                    ? employee.rank
                    : (employee.rank + 1) });
        };
        return __assign({}, department, { head: tryPromote(department.head), employee: department.employee.map(tryPromote) });
    });
};
var generateEmployee = (function () {
    var i = 0;
    return function (length, employee) {
        return Array.from({ length: length }, function () { return (__assign({}, employee, { id: i++ })); });
    };
})();
var departments = [
    {
        title: 'Procurement',
        head: generateEmployee(1, { position: 'manager', rank: 2 })[0],
        employee: generateEmployee(9, { position: 'manager', rank: 1 }).concat(generateEmployee(3, { position: 'manager', rank: 2 }), generateEmployee(2, { position: 'manager', rank: 3 }), generateEmployee(2, { position: 'marketer', rank: 1 }))
    },
    {
        title: 'Sales',
        head: generateEmployee(1, { position: 'marketer', rank: 2 })[0],
        employee: generateEmployee(12, { position: 'manager', rank: 1 }).concat(generateEmployee(6, { position: 'marketer', rank: 1 }), generateEmployee(3, { position: 'analyst', rank: 1 }), generateEmployee(2, { position: 'analyst', rank: 2 }))
    },
    {
        title: 'Advertising',
        head: generateEmployee(1, { position: 'marketer', rank: 3 })[0],
        employee: generateEmployee(1, { position: 'marketer', rank: 3 }).concat(generateEmployee(15, { position: 'marketer', rank: 1 }), generateEmployee(10, { position: 'marketer', rank: 2 }), generateEmployee(8, { position: 'manager', rank: 1 }))
    },
    {
        title: 'Logistics',
        head: generateEmployee(1, { position: 'manager', rank: 1 })[0],
        employee: generateEmployee(1, { position: 'manager', rank: 1 }).concat(generateEmployee(13, { position: 'manager', rank: 1 }), generateEmployee(5, { position: 'manager', rank: 2 }), generateEmployee(5, { position: 'engineer', rank: 1 }))
    }
];
console.table(calcStats(employeeRate, departments));
console.table(calcStats(employeeRate, antiCrisisMeasureFirst(departments)));
console.table(calcStats.apply(void 0, antiCrisisMeasureSecond(employeeRate, departments)));
console.table(calcStats(employeeRate, antiCrisisMeasureThird(departments)));
