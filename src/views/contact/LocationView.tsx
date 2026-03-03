import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Heading from '@/components/ui/Heading';
import Footer from '@/components/home/Footer';
import 'leaflet/dist/leaflet.css'

export default function LocationView() {
    return (
        <div>
            <div className="py-10 max-w-5xl mx-auto">
                <Heading
                    title='Ubicación'
                    description='Encuentranos facilmente'
                />
                <div className='py-10'>
                    <MapContainer style={{ height: 500 }} center={[53.4831, -2.2003]} zoom={16}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker 
                            eventHandlers={{
                                add: (e) => {
                                    e.target.openPopup();
                                },
                            }} 
                            position={[53.4831, -2.2003]}
                        >
                            <Popup>
                                CINEPLEX
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>

            <Footer />
        </div>
    )
}
