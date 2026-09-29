import React from 'react';
import NewsCard from './NewsCard';

type NewsItem = {
    type: string;
    icon: React.ReactNode;
    labelColor: string;
    message: string;
    time: string;
};

type NewsCardsProps = {
    newsData: NewsItem[];
};

const NewsCards: React.FC<NewsCardsProps> = ({ newsData }) => {
    return (
        <div className="space-y-5">
            {newsData.map((news, idx) => (
                <NewsCard
                    key={idx}
                    type={news.type}
                    icon={news.icon}
                    labelColor={news.labelColor}
                    message={news.message}
                    time={news.time}
                />
            ))}
        </div>
    );
};

export default NewsCards;
