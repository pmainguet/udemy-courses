//doesn't need state so we can just make a functional component
import React from 'react';
import VideoListItem from './video_list_item';

const VideoList=(props)=>{
    const videoItems = props.videos.map((v) => { 
        return(
            <VideoListItem
                onVideoClick={props.onVideoSelect}
                key={v.etag}
                video={v}
            /> 
        );
    });
    return(
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul>
    );
};

export default VideoList;