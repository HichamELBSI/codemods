import Component from 'react';
import R from 'ramda';

@Decorator('test')
class TestWithoutExportedClass extends Component {

}

export default TestWithoutExportedClass;
