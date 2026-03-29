import React, { useState, useEffect, useCallback, useRef } from 'react';
import api from './api/awsApi';

// Components
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ImageGallery from './components/ImageGallery';
import MdSnackbar from './components/ui/MdSnackbar';

export default function App() {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Upload State
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Global Feedback
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showMessage = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
  };

  // 🔍 Fetch Images (FIXED)
  const fetchImages = useCallback(async (query) => {
    // 🛑 Prevent empty API call
    if (!query) {
      setImages([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const results = await api.searchImages(query);
      setImages(results);
    } catch (err) {
      showMessage("API Error: Failed to fetch images.", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(searchQuery);
  }, [searchQuery, fetchImages]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
    setImages([]);
  };

  // 📤 Upload Flow (kept same)
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showMessage("Invalid file type. Please select an image.", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage("File is too large. Maximum size is 5MB.", "error");
      return;
    }

    setUploadFile(file);
    processUpload(file);
  };

  const processUpload = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const { uploadUrl } = await api.getUploadUrl(file.name, file.type);

      await api.uploadToS3(uploadUrl, file, (progress) => {
        setUploadProgress(progress);
      });

      showMessage("Upload Complete! Processing tags...", "success");

      setTimeout(() => {
        setUploadFile(null);
        setIsUploading(false);
        setUploadProgress(0);
        fetchImages(searchQuery);
      }, 1000);

    } catch (error) {
      showMessage(error.message || "Upload failed. Please try again.", "error");
      setIsUploading(false);
      setUploadFile(null);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        handleClearSearch={handleClearSearch}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        <section>
          <UploadSection
            isUploading={isUploading}
            uploadFile={uploadFile}
            uploadProgress={uploadProgress}
            handleFileSelect={handleFileSelect}
            fileInputRef={fileInputRef}
          />
        </section>

        <section>
          <ImageGallery
            isLoading={isLoading}
            images={images}
            searchQuery={searchQuery}
            handleClearSearch={handleClearSearch}
          />
        </section>

      </main>

      <MdSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      />
    </div>
  );
}