import { createBrowserRouter, redirect } from 'react-router-dom'

import Homepage from '../pages/Homepage/Homepage'
import DetailPage from '../pages/DetailPage/DetailPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import CMSPage from '../pages/CMSPage/CMSPage';
import AddAStaffPage from '../pages/AddAStaffPage/AddAStaffPage';
import AddEditCuisinePage from '../pages/AddEditCuisinePage/AddEditCuisinePage';
import ChangeImagePage from '../pages/ChangeImagePage/ChangeImagePage';


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Homepage />
        },
        {
            path: '/detail/:id',
            element: <DetailPage />
        },
        {
            path: '/login',
            element: <LoginPage />,
            loader: () => {
                if (localStorage.getItem("access_token")) {
                  return redirect('/cms')
                }
                return null
            }
        },
        {
            loader: () => {
                if (!localStorage.getItem("access_token")) {
                  return redirect('/login')
                }
                return null
            },
            children:
            [
                {
                    path: '/cms',
                    element: <CMSPage />
                },
                {
                    path: '/add-staff',
                    element: <AddAStaffPage />
                },
                {
                    path: '/add-edit-cuisine',
                    element: <AddEditCuisinePage />
                },
                {
                    path: '/add-edit-cuisine/:id',
                    element: <AddEditCuisinePage />
                },
                {
                    path: '/change-cuisine-image/:id',
                    element: <ChangeImagePage />
                }
            ]
        }
    ]
)

export default router;