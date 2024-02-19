import { Component } from 'react';
import ApiCaller from '../../config/ApiCaller';
import { LoaderAction } from '../Actions';
import API from '../../config/APIUrl';
import { toast } from 'react-toastify';

export class AuthMiddleware extends Component {
  static registerUser({ Username, email, password, profilePictureFileName }) {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let payload = {
            first_name: Username,
            email: email,
            password: password,
            profilePictureFileName: profilePictureFileName
          }
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(API.Signup,
            payload,
          );
          console.log('response', response);
          if (response.status === 200) {
            resolve(response);
            dispatch(LoaderAction.LoaderFalse());
            // toast.success(ToastSuccess(response.data.message))

          } else {
            reject(false);
            dispatch(LoaderAction.LoaderFalse());
            // ToastError(response.data.message)
          }
        } catch (error) {
          reject(false)
          dispatch(LoaderAction.LoaderFalse());
          // toast.error(ToastError(error.message))
        }
      });
    };
  }
  static loginUser({ email, password, }) {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let payload = {
            email: email,
            password: password
          }

          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(API.Login,
            payload,
          );
          console.log('response', response);
          if (response.status === 200) {
            resolve(response);
            dispatch(LoaderAction.LoaderFalse());
            // toast.success(ToastSuccess(response.data.message))

          } else {
            reject(false);
            dispatch(LoaderAction.LoaderFalse());
            toast.error(response.data.message, { position: 'top-right' })
          }
        } catch (error) {
          reject(false)
          dispatch(LoaderAction.LoaderFalse());
          // toast.error(ToastError(error.message))
        }
      });
    };
  }
  static getAllProducts({ token }) {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const BearerHeaders = ApiCaller.BearerHeaders(token)
          const response = await ApiCaller.Get(API.getAllProduct,
            BearerHeaders,
          );
          console.log('response', response);
          if (response.status === 200) {
            resolve(response);
            dispatch(LoaderAction.LoaderFalse());
            // toast.success(ToastSuccess(response.data.message))

          } else {
            reject(false);
            dispatch(LoaderAction.LoaderFalse());
            // ToastError(response.data.message)
          }
        } catch (error) {
          reject(false)
          dispatch(LoaderAction.LoaderFalse());
          // toast.error(ToastError(error.message))
        }
      });
    };
  }
}

