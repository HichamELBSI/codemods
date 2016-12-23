import Component from 'react';
import R from 'ramda';

class TestWithoutExportedClass extends Component {

}

const enhance = R.pipe(Decorator('test'));
export default enhance(TestWithoutExportedClass);
