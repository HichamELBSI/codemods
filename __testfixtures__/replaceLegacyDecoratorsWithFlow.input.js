// @flow
import Component from 'react';
import R from 'ramda';


type Props = {
    stuff1: Object,
    stuff2: () => Promise<*>,
}

class testWithFlow extends Component {

}

const enhance = R.pipe(
    stuff,
);
export default enhance(testWithFlow);
