import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GeoLocation from '../../components/GeoLocation'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import InfoCard from '../../components/InfoCard'


const Search = ({ searchResults }) => {
    const router = useRouter()
    const { location, startDate, endDate, noOfGuests } = router.query
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`

    return (
        <div className="h-screen">
            <Header placeholder={`${location} | ${range} | ${noOfGuests} | guests`} />
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {noOfGuests} number of guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>
                    <div className='flex flex-col'>
                        {searchResults?.map(({long, lat, ...searchResult}, idx) => (
                            <InfoCard key={idx} {...searchResult} />
                        ))}
                    </div>

                </section>

                <section className="hidden xl:inline-flex xl-min-w-[600px]">
                    <GeoLocation searchResults={searchResults} />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Search

export const getServerSideProps = async () => {
    let searchResults = await fetch('https://links.papareact.com/isz')

    searchResults = await searchResults.json()
    return {
        props: {
            searchResults
        }
    }
}