import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { GrSearch } from "react-icons/gr";
import { MdEmail, MdPerson } from "react-icons/md";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";

const Search = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const [donors, SetDonors] = useState([]);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    email: "",
    blood_group: "",
    district: "",
    upazilla: "",
  });

  const onSubmit = async (data) => {
    setFilter({
      blood_group: data.blood_group,
      district: data.district,
      upazilla: data.upazilla,
    });
  };

  useEffect(() => {
    axiosPublic
      .get(
        `/donors?group=${encodeURIComponent(filter?.blood_group)}&district=${
          filter?.district
        }&upazilla=${filter?.upazilla}`
      )
      .then((res) => SetDonors(res.data));
    setLoading(false);
    setTriggerRefetch(false);
  }, [triggerRefetch, axiosPublic, filter]);

  return (
    <>
      <div className="custom-min-height" data-aos="fade-up">
        <Helmet>
          <title>BloodBridge | Search Donor</title>
        </Helmet>
        <hr className="my-3" />
        <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-center">
          Search Donors
        </h3>

        <hr className="my-3" />
        <form
          className="bg-background rounded-xl px-5 py-8 max-w-xl mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-x-2 md:gap-x-2 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Blood Group
              </label>
              <select
                {...register("blood_group")}
                defaultValue={""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value={""}>Any</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            {/* DISTRICT */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                District
              </label>
              <select
                {...register("district")}
                defaultValue={""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value={""}>Any</option>
                <option value="Comilla">Comilla</option>
                <option value="Feni">Feni</option>
                <option value="Brahmanbaria">Brahmanbaria</option>
                <option value="Rangamati">Rangamati</option>
                <option value="Noakhali">Noakhali</option>
                <option value="Chandpur">Chandpur</option>
                <option value="Lakshmipur">Lakshmipur</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Coxsbazar">Coxsbazar</option>
                <option value="Khagrachhari">Khagrachhari</option>
                <option value="Bandarban">Bandarban</option>
                <option value="Sirajganj">Sirajganj</option>
                <option value="Pabna">Pabna</option>
                <option value="Bogura">Bogura</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Natore">Natore</option>
                <option value="Joypurhat">Joypurhat</option>
                <option value="Chapainawabganj">Chapainawabganj</option>
                <option value="Naogaon">Naogaon</option>
                <option value="Jashore">Jashore</option>
                <option value="Satkhira">Satkhira</option>
                <option value="Meherpur">Meherpur</option>
              </select>
            </div>
            {/* UPAZILLA */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Upazila
              </label>
              <select
                defaultValue={""}
                {...register("upazilla")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              >
                <option value={""}>Any</option>
                <option value="Debidwar">Debidwar</option>
                <option value="Barura">Barura</option>
                <option value="Brahmanpara">Brahmanpara</option>
                <option value="Chandina">Chandina</option>
                <option value="Chauddagram">Chauddagram</option>
                <option value="Daudkandi">Daudkandi</option>
                <option value="Homna">Homna</option>
                <option value="Laksam">Laksam</option>
                <option value="Muradnagar">Muradnagar</option>
                <option value="Nangalkot">Nangalkot</option>
                <option value="Comilla Sadar">Comilla Sadar</option>
                <option value="Meghna">Meghna</option>
                <option value="Monohargonj">Monohargonj</option>
                <option value="Sadarsouth">Sadarsouth</option>
                <option value="Titas">Titas</option>
                <option value="Burichang">Burichang</option>
                <option value="Lalmai">Lalmai</option>
                <option value="Chhagalnaiya">Chhagalnaiya</option>
                <option value="Feni Sadar">Feni Sadar</option>
                <option value="Sonagazi">Sonagazi</option>
                <option value="Fulgazi">Fulgazi</option>
                <option value="Parshuram">Parshuram</option>
                <option value="Daganbhuiyan">Daganbhuiyan</option>
                <option value="Brahmanbaria Sadar">Brahmanbaria Sadar</option>
                <option value="Kasba">Kasba</option>
                <option value="Nasirnagar">Nasirnagar</option>
                <option value="Sarail">Sarail</option>
                <option value="Ashuganj">Ashuganj</option>
                <option value="Akhaura">Akhaura</option>
                <option value="Nabinagar">Nabinagar</option>
                <option value="Bancharampur">Bancharampur</option>
                <option value="Bijoynagar">Bijoynagar</option>
                <option value="Rangamati Sadar">Rangamati Sadar</option>
                <option value="Kaptai">Kaptai</option>
                <option value="Kawkhali">Kawkhali</option>
              </select>
            </div>
          </div>
          <button className="btn bg-primary hover:bg-primary hover:shadow-xl text-white w-full">
            Search<GrSearch className="text-xl"></GrSearch>
          </button>
        </form>
        <hr className="my-3" />
        {loading ? (
          <>
            <div className="flex justify-center items-center py-20 w-full">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </>
        ) : (
          <>
            <div>
              {donors.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-20">
                    {donors.map((donor) => (
                      <div
                        key={donor._id}
                        className="flex flex-col border border-gray-500 text-text font-heading h-full bg-background shadow-xl p-4 rounded-xl"
                      >
                        <div className="flex justify-between items-center">
                          <h1 className="font-bold text-xl flex items-center gap-2">
                            <MdPerson className="text-primary"></MdPerson>{" "}
                            {donor.name}
                          </h1>
                          <span className="badge text-white bg-primary border-none font-bold">
                            {donor.blood_group}
                          </span>
                        </div>
                        <hr className="my-1" />
                        <p className="flex items-center gap-2">
                          <MdEmail className="text-secondary"></MdEmail>{" "}
                          {donor.email}
                        </p>
                        <h1 className="text-sm font-bold flex items-center gap-2">
                          <BiLocationPlus className="text-primary"></BiLocationPlus>{" "}
                          {donor.district}, {donor.upazilla}
                        </h1>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="font-heading max-w-xl font-bold text-2xl text-primary text-center mx-auto py-24">
                    No Donor Found
                  </h1>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Search;
