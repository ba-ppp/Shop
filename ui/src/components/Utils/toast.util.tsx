/** @jsxImportSource @emotion/react */
import { ReactElement } from 'react';
import toast, { Toast } from 'react-hot-toast';
import 'twin.macro';
import { CustomToast } from './CustomToast';

export const customToast = {
  success: (message: string | ReactElement, title?: string) => {
    toast.dismiss();
    toast(
      <CustomToast
        type="success"
        title={title || 'Success'}
        message={message}
      />,
    );
  },
  error: (
    message: string | ReactElement,
    options?:
      | Partial<
          Pick<
            Toast,
            | 'id'
            | 'icon'
            | 'duration'
            | 'ariaProps'
            | 'className'
            | 'style'
            | 'position'
            | 'iconTheme'
          >
        >
      | undefined,
  ) => {
    toast.dismiss();
    toast(
      <CustomToast type="error" title="Error" message={message} />,
      options,
    );
  },
  loading: (
    message: string | ReactElement,
    options?:
      | Partial<
          Pick<
            Toast,
            | 'id'
            | 'icon'
            | 'duration'
            | 'ariaProps'
            | 'className'
            | 'style'
            | 'position'
            | 'iconTheme'
          >
        >
      | undefined,
  ) => {
    toast.dismiss();
    toast(
      <CustomToast type="loading" title="Please wait" message={message} />,
      options,
    );
  },
  promise: (
    promise: Promise<any>,
    options: {
      loading?: string | ReactElement;
      titleSuccess?: string;
      titleError?: string;
      success: string | ReactElement;
      error: string | ReactElement;
    },
  ) => {
    toast.dismiss();
    toast.promise(promise, {
      loading: !options?.loading ? (
        'Please wait...'
      ) : (
        <CustomToast title="Please wait" message={options.loading} />
      ),
      success: (
        <CustomToast
          title={options?.titleSuccess ?? 'Success'}
          message={options.success}
        />
      ),
      error: <CustomToast title="Error" message={options.error} />,
    });
  },
//   downloadable: (
//     reportName: string,
//     toastType: ToastNotiEnum,
//     clickCallbackFn: (e: MouseEvent<HTMLSpanElement>) => unknown,
//   ) => {

//     const getToastMessage = (type: ToastNotiEnum) => {
//       switch (type) {
//         case ToastNotiEnum.MULTI_EXPORT:
//           return 'Export';
//         case ToastNotiEnum.MULTI_COMBINED:
//           return 'Combined Clip';
//         default:
//           return 'Mentions Report';
//       }
//     };

//     toast.custom(
//       (t) =>
//         ToastMessage({
//           title: reportName || 'Success',
//           message: (
//             <div>
//               <div>Your Multi-item {getToastMessage(toastType)} is ready</div>
//               <div tw="mt-3">
//                 Click here to{' '}
//                 <span
//                   tw="underline text-style-purple-2 cursor-pointer hover:(font-medium)"
//                   onClick={(e) => {
//                     toast.remove(t.id);
//                     clickCallbackFn(e);
//                   }}
//                 >
//                   download
//                 </span>
//               </div>
//             </div>
//           ),
//           type: 'success',
//           close: () => {
//             toast.remove(t.id);
//           },
//         }),
//       {
//         position: 'bottom-right',
//         duration: 5000 * 60, // 5 min
//       },
//     );
//   },
};
