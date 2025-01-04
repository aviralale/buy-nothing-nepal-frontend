import React, { useState, useEffect, useRef } from "react";
import { Map, MapPin, Loader, Search, History, Navigation } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LocationSelector = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Common locations for quick suggestions
  const commonLocations = [
    { name: "Nearby Restaurants", category: "restaurant" },
    { name: "Coffee Shops", category: "cafe" },
    { name: "Shopping Malls", category: "mall" },
    { name: "Parks", category: "park" },
    { name: "Hotels", category: "hotel" },
  ];

  useEffect(() => {
    getCurrentLocation();
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem("recentLocationSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    // Click outside handler for search suggestions
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setSelectedLocation(newLocation);
        if (onLocationSelect) {
          onLocationSelect(newLocation);
        }
        setLoading(false);
        setMapKey((prev) => prev + 1);
        // Reverse geocode to get address
        fetchLocationAddress(newLocation);
      },
      (error) => {
        setError("Unable to retrieve your location");
        setLoading(false);
        setSelectedLocation({ lat: 51.505, lng: -0.09 });
      }
    );
  };

  const fetchLocationAddress = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`
      );
      const data = await response.json();
      if (data.display_name) {
        addToRecentSearches({
          name: data.display_name,
          lat: location.lat,
          lng: location.lng,
        });
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  const searchLocation = debounce(async (query) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5`
      );
      const data = await response.json();

      // Process and format the results
      const formattedResults = data.map((item) => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        type: item.type,
        importance: item.importance,
      }));

      setSearchResults(formattedResults);
    } catch (err) {
      setError("Error searching for location");
    } finally {
      setSearching(false);
    }
  }, 300);

  const addToRecentSearches = (location) => {
    const updatedSearches = [
      location,
      ...recentSearches.filter(
        (item) => item.lat !== location.lat || item.lng !== location.lng
      ),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    localStorage.setItem(
      "recentLocationSearches",
      JSON.stringify(updatedSearches)
    );
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation({
      lat: location.lat,
      lng: location.lng,
    });

    if (onLocationSelect) {
      onLocationSelect({
        lat: location.lat,
        lng: location.lng,
      });
    }

    addToRecentSearches(location);
    setSearchQuery(location.name);
    setShowSuggestions(false);
    setSearchResults([]);
    setMapKey((prev) => prev + 1);
  };

  const handleSearchNearby = async (category) => {
    if (!selectedLocation) return;

    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${category}&lat=${selectedLocation.lat}&lon=${selectedLocation.lng}&bounded=1`
      );
      const data = await response.json();
      setSearchResults(
        data.map((item) => ({
          name: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          type: item.type,
        }))
      );
    } catch (err) {
      setError("Error searching nearby places");
    } finally {
      setSearching(false);
    }
  };

  // Map initialization and event handlers remain the same as previous version...
  useEffect(() => {
    if (!selectedLocation) return;

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.async = true;

    script.onload = () => {
      const L = window.L;

      const map = L.map("map", {
        doubleClickZoom: false,
      }).setView([selectedLocation.lat, selectedLocation.lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "",
      }).addTo(map);

      const marker = L.marker([selectedLocation.lat, selectedLocation.lng], {
        draggable: true,
      }).addTo(map);

      marker.on("dragend", (e) => {
        const position = e.target.getLatLng();
        const newLocation = {
          lat: position.lat,
          lng: position.lng,
        };
        setSelectedLocation(newLocation);
        if (onLocationSelect) {
          onLocationSelect(newLocation);
        }
        fetchLocationAddress(newLocation);
      });

      map.on("dblclick", (e) => {
        const newLocation = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        marker.setLatLng(newLocation);
        setSelectedLocation(newLocation);
        if (onLocationSelect) {
          onLocationSelect(newLocation);
        }
        fetchLocationAddress(newLocation);
      });

      let lastTap = 0;
      map.on("tap", (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
          const newLocation = {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          };
          marker.setLatLng(newLocation);
          setSelectedLocation(newLocation);
          if (onLocationSelect) {
            onLocationSelect(newLocation);
          }
          fetchLocationAddress(newLocation);
        }
        lastTap = currentTime;
      });

      map.zoomControl.setPosition("topright");

      return () => {
        map.remove();
      };
    };

    document.head.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, [selectedLocation, mapKey]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-6 w-6" />
          Location Selector
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="">
            <Button
              onClick={getCurrentLocation}
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              {loading ? "Loading..." : "Current Location"}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="relative w-full h-96 border rounded-lg">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center ">
                <Loader className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-500 italic">
          Hold to drag and move the map. Double-click or double-tap to set the
          location.
        </span>
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
