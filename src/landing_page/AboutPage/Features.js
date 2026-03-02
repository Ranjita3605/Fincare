import React from 'react';

function Features() {
	return (
		<section className="features-section container">
			<h1 style={{textAlign: 'center'}}>Key Features</h1>
			<ul className="features-list" style={{textAlign: 'center', textDecoration: 'none'}}>
				<li>User-friendly financial dashboards</li>
				<li>Multilingual Voice Assistance</li>
				<li>Voice-Guided Form Filling</li>
                <li>Audio Verification Before Submission</li>
                <li>AI-Based Scheme Recommendations</li>
                <li>Location-Based Scheme Filtering</li>
			</ul>
		</section>
	);
}

export default Features;