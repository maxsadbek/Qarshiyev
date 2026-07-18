import toast from 'react-hot-toast';

// ============================================================
// useToast Hook
// ============================================================
// TODO: Integrate with React Hot Toast for global notifications
// TODO: Add success, error, warning, info presets

export function useToast() {
  const showSuccess = (message: string) => toast.success(message);
  const showError = (message: string) => toast.error(message);
  const showWarning = (message: string) => toast(message, { icon: '⚠️' });
  const showInfo = (message: string) => toast(message, { icon: 'ℹ️' });
  const showLoading = (message: string) => toast.loading(message);
  const dismiss = () => toast.dismiss();

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
  };
}

