'use client';

import { MarketingCampaign, User, UserRole } from '@/src/utils/types';
import { useState } from 'react';
import MarketingModule from './_components/MarketingPage';


// Mock data for campaigns
const MOCK_CAMPAIGNS: MarketingCampaign[] = [
    {
        id: 'camp-1',
        businessName: 'The Daily Crust Bakery',
        title: 'Warm Sourdough Sundays!',
        description: 'Get 20% off our special sourdough loaves every Sunday morning.',
        type: 'Discount',
        status: 'Active',
        startDate: '2023-11-01',
        endDate: '2023-12-31',
        fee: 150,
        image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=800&auto=format&fit=crop&q=60',
        reach: 1240,
        engagement: 342
    },
    {
        id: 'camp-2',
        businessName: 'Metro Mall Express',
        title: 'Flash Sale: Electronics',
        description: 'Exclusive opening discounts on peripherals.',
        type: 'Banner',
        status: 'Pending',
        startDate: '2023-12-05',
        endDate: '2023-12-10',
        fee: 450,
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60',
        reach: 0,
        engagement: 0
    },
    {
        id: 'camp-3',
        businessName: 'Eco-Wash Car Care',
        title: 'Waterless Car Spa',
        description: 'Premium detailing services now available in basement parking.',
        type: 'Sponsored Event',
        status: 'Active',
        startDate: '2023-11-15',
        endDate: '2023-12-15',
        fee: 200,
        image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=60',
        reach: 890,
        engagement: 112
    },
    {
        id: 'camp-4',
        businessName: 'Peak Fitness',
        title: 'New Year, New You',
        description: '3 months free for society residents.',
        type: 'Discount',
        status: 'Active',
        startDate: '2024-01-01',
        endDate: '2024-02-29',
        fee: 300,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60',
        reach: 500,
        engagement: 100
    },
    {
        id: 'camp-5',
        businessName: 'Pet Paradise',
        title: 'Pet Grooming 10% Off',
        description: 'Special midweek discounts for furry friends.',
        type: 'Discount',
        status: 'Active',
        startDate: '2023-11-10',
        endDate: '2023-11-20',
        fee: 100,
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop&q=60',
        reach: 420,
        engagement: 50
    },
    {
        id: 'camp-6',
        businessName: 'Tech Fixers',
        title: 'Laptop Service Home Pickup',
        description: 'Free pickup and drop for all apartment blocks.',
        type: 'Banner',
        status: 'Active',
        startDate: '2023-12-01',
        endDate: '2023-12-15',
        fee: 180,
        image: 'https://images.unsplash.com/photo-1588702547919-26089e690ec9?w=800&auto=format&fit=crop&q=60',
        reach: 210,
        engagement: 30
    },
];

// Mock user data
const MOCK_USER: User = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: UserRole.ADMIN,
    apartment: 'A-101'
};

const MarketingPage = () => {
    // State for campaigns
    const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(MOCK_CAMPAIGNS);

    // Handler to update campaigns
    const handleUpdateCampaigns = (updatedCampaigns: MarketingCampaign[]) => {
        setCampaigns(updatedCampaigns);
        // In a real app, you might want to save to localStorage or make an API call
        localStorage.setItem('marketing_campaigns', JSON.stringify(updatedCampaigns));
    };

    // Optional: Load from localStorage on initial render
    // useEffect(() => {
    //   const saved = localStorage.getItem('marketing_campaigns');
    //   if (saved) {
    //     setCampaigns(JSON.parse(saved));
    //   }
    // }, []);

    return (

        <div className="">
            <MarketingModule
                user={MOCK_USER}
                campaigns={campaigns}
                onUpdateCampaigns={handleUpdateCampaigns}
            />
        </div>

    );
};

export default MarketingPage;