import React from 'react';
import styles from './DefaultLayout.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("container")}>
            {children}
        </div>

    );
}

export default DefaultLayout;