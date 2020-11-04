if Rails.env.development
  ENV["REDIS_URL"] = ENV["REDIS_URL"] || "redis://localhost:6379"
end
