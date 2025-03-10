'use client';

import { motion } from 'framer-motion';
import { containerVariants, childVariants } from '@components/Variants';
import { useParams } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { APIService } from "@/lib/APIService";

const CategoryPage = () => {
    const params = useParams();
    const { category } = params;
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState([]);
    const imageCount = 10;
    const getImagePath = (imageName) => `/images/gallery/${category}/${imageName}.jpg`;
    const imageIndices = Array.from({ length: imageCount }, (_, index) => index + 1);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = (e) => {
        if (e.target.id === 'modal-background') {
            setSelectedImage(null);
        }
    };

    useEffect(() => {
        const apiService = new APIService();

        async function getServices() {
            let services = await apiService.Services.getAll();
            const matchedService = services.find(service => service.id.toString() === category);

            if (matchedService) {
                setCategoryName(matchedService.name);
                setCategoryImage(matchedService.image);
            } else {
                setCategoryName('Unknown Category');
            }
        }
        getServices();
    }, [category]);

    useEffect(() => {
        const apiService = new APIService();

        async function fetchPhotos() {
            try {
                let photos = await apiService.Photos.getAll();  // Fetch photos
                console.log("Fetched photos:", photos);

                // Check if photos array contains image URLs
                if (Array.isArray(photos) && photos.length > 0) {
                    console.log("First photo URL:", photos[0].image);
                } else {
                    console.warn("No photos found in API response.");
                }
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        }

        fetchPhotos();
    }, []);


    // const artistId = [5, 2, 3];

    // useEffect(() => {
    //     const apiService = new APIService();

    //     async function fetchData() {
    //         try {
    //             let artist = await apiService.Artists.getById(artistId);
    //             console.log("gathered artist:", artist);

    //             let photos = await apiService.Photos.getAll({
    //                 artist: artistId,
    //             });
    //             console.log("gathered photos:", photos);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     }

    //     fetchData();
    // }, [JSON.stringify(artistId)]); 




    return (
        <div className="bg-neutral-950 text-white">
            <motion.div
                className="relative bg-cover bg-center h-64 flex items-center justify-center"
                style={{ backgroundImage: `url(${categoryImage})` }}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 z-0"></div>
                <h1 className="text-4xl font-bold uppercase text-center text-white p-6 z-10">
                    {categoryName} Gallery
                </h1>
            </motion.div>

            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
            >
                {imageIndices.length > 0 ? (
                    <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
                        {imageIndices.map((index) => (
                            <motion.div
                                key={index}
                                className="group cursor-pointer"
                                variants={childVariants}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => openModal(getImagePath(index))}
                            >
                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                                    <img
                                        src='https://via.placeholder.com/150'
                                        // alt={`${category} image ${index}`}
                                        className="object-cover object-center sm:w-48 md:w-64 lg:w-80 h-20 w-20 md:h-52 lg:h-64 group-hover:opacity-75 transition-opacity duration-300"
                                        loading='lazy'
                                        width={256}
                                        height={256}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <p className="text-center text-gray-400">
                        No photos available in the {category} category yet. Check back later!
                    </p>
                )}
            </motion.div>
            {selectedImage && (
                <div
                    id="modal-background"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeModal}
                >
                    <div className="relative">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="max-w-full max-h-screen rounded-md"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
