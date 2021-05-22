import React from 'react';
import AppContainer from '../components/AppContainer';

export default function notfound() {
    return (
        <AppContainer>
            <div className="flex h-screen">
                <div className="m-auto">
                    <h3 className="text-xl font-bold">Halaman tidak ditemukan ....</h3>
                </div>
            </div>
        </AppContainer>
    );
}
