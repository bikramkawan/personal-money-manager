/**
 * Created by bikramkawan on 8/17/17.
 */
import * as _ from 'lodash';
const categories = {
    rent: 'rent',
    groceries: 'groceries',
    salary: 'salary',
    utilities: 'utilities',
    transportation: 'transportation'
}

export function filterAndSumBy(arr, iterator, iteratorVal, sumBy) {
    return _.sumBy(_.filter(arr, _.iteratee([iterator, iteratorVal])), sumBy)

}

export const expenseCategories = {
    rent: 'rent',
    groceries: 'groceries',
    utilities: 'utilities',
    transportation: 'transportation'
}

export default categories