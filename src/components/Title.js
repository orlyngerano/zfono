import React from 'react';
import {
    Header
} from "semantic-ui-react";
import { COLOR_MAIN } from '../themes/color';

/**
 * Title Component that can be included in different screens.
 */
const Title = (props) => {
    return (
        <div>
            <Header color={COLOR_MAIN} size='huge' as={'span'}>zFono</Header>&nbsp;&nbsp;
        <Header size='medium' as={'span'}>your one stop mobile device finder</Header>
        </div>
    )
}
export default Title;