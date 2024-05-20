-- 사용자 테이블
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 구간 테이블
CREATE TABLE segments (
    segment_id SERIAL PRIMARY KEY,
    start_point GEOGRAPHY(POINT, 4326) NOT NULL,
    end_point GEOGRAPHY(POINT, 4326) NOT NULL,
    route_length DOUBLE PRECISION NOT NULL,
    elevation_gain DOUBLE PRECISION,
    estimated_time INTERVAL,
    avg_speed_variance DOUBLE PRECISION,
    acceleration_variance DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GPS 데이터 테이블
CREATE TABLE gps_data (
    gps_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    segment_id INT REFERENCES segments(segment_id),
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    altitude DOUBLE PRECISION,
    speed DOUBLE PRECISION,
    acceleration DOUBLE PRECISION,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 도로 상태 테이블
CREATE TABLE road_condition (
    condition_id SERIAL PRIMARY KEY,
    segment_id INT REFERENCES segments(segment_id),
    condition_score DOUBLE PRECISION NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
