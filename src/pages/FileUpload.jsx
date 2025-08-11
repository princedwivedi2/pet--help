import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoaderLottie from '../components/LoaderLottie';

export default function FileUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = e => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = (file) => {
    setLoading(true);
    setTimeout(() => {
      setFile(file);
      setLoading(false);
    }, 1500); // Simulate upload
  };

  return (
    <motion.section 
      className="min-h-screen flex flex-col items-center py-8 px-4"
      style={{
        background: 'linear-gradient(135deg, #FFF8F3 0%, #FDF6F0 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="font-heading text-responsive-xl text-primary mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        Upload Pet Files
      </motion.h2>
      
      <motion.div
        className={`
          w-full max-w-lg h-64 
          flex flex-col items-center justify-center 
          rounded-xl transition-all duration-300 
          glassmorphism reduced-motion relative
          ${dragActive ? 'shadow-glow' : 'shadow-elevated'}
        `}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        style={{
          borderWidth: '2px',
          borderStyle: 'dashed',
          borderColor: dragActive ? '#F76C6C' : 'rgba(108, 117, 125, 0.3)',
          cursor: 'pointer',
          boxShadow: dragActive 
            ? '0 0 15px rgba(247, 108, 108, 0.5)' 
            : '0 10px 30px -15px rgba(0,0,0,0.1)'
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
        />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoaderLottie />
              <motion.p 
                className="text-primary text-responsive-base mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Uploading...
              </motion.p>
            </motion.div>
          ) : file ? (
            <motion.div 
              key="success"
              className="text-center px-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <motion.div 
                className="text-6xl mb-2"
                initial={{ rotate: -15 }}
                animate={{ rotate: 0 }}
              >
                ✅
              </motion.div>
              <p className="text-success font-bold text-responsive-lg">{file.name}</p>
              <p className="text-secondary text-responsive-base mt-2">
                Successfully uploaded!
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="upload-prompt"
              className="text-secondary text-responsive-base text-center px-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <motion.div 
                className="text-5xl mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                📤
              </motion.div>
              <p>Drag & drop a pet file here</p>
              <p className="mt-2 text-primary-dark font-bold">or click to select</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-secondary text-responsive-base max-w-md"
      >
        <p>Upload medical records, images, or vaccination documents for your pet.</p>
        <p className="mt-2 text-xs text-secondary/70">Supported formats: PDF, JPG, PNG (up to 10MB)</p>
      </motion.div>
    </motion.section>
  );
}
