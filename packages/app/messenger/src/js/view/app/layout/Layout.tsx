import React, {FunctionComponent} from 'react';
import Header from "@/js/view/app/layout/Header/Header";
import {LayoutProps} from "@/js/view/app/layout/Layout.props";
// @ts-ignore
import styles from './Layout.module.scss'
import {Outlet} from "react-router-dom";

const Layout = ({children}: LayoutProps):JSX.Element => {
    return (
        <div className={styles.container}>
            <Header/>
            {children}
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props}/>
            </Layout>
        )
    }
}