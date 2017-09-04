/**
 * Created by bikramkawan on 8/17/17.
 */
import * as _ from 'lodash';
const categories = {
    income: {
        salary: 'salary',
        freelance: 'freelance',
        gifts: 'gifts',
        other: 'other'
    },
    savings: {
        investments: 'investments',
        retirement: 'retirement'

    },
    housing: {

        rent: 'rent',
        furnishing: 'furnishing'
    },
    utilities: {

        electricity: 'electricity',
        phone: 'phone',
        internet: 'internet',
        other: 'other'
    },
    food: {
        groceries: 'groceries',
        eatingoutside: 'eatingoutside',
        alcohol: 'alcohol'
    },
    transportation: {
        public: 'public',
        repairs: 'repairs',
        airfare: 'airfare'
    },
    health: {
        insurance: 'insurance',
        medicine: 'medicine'
    }, dailyliving: {

        education: 'education',
        clothing: 'clothing',
        personal: 'personal',
        other: 'other'

    },
    entertainment: {
        vacation: 'vacation',
        movies: 'movies',
        concert: 'concert',
        sports: 'sports',
        other: 'other'
    },
    business: {
        lend: 'lend',
        borrow: 'borrow'
    },
    miscellaneous: {
        bankfees: 'bankfees',
        other: 'other'
    }


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