import bgOcean from "../../assets/parallax/nightOcean/1.png";
import moon from "../../assets/parallax/nightOcean/2.png";
import cloud from "../../assets/parallax/nightOcean/3.png";
import moonLight from "../../assets/parallax/nightOcean/4.png";
export default function BgNightOcean() {
  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="relative h-full w-full brightness-90">
          <div
            className="absolute top-0 left-0 h-full w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${bgOcean})`,
              backgroundPosition: "center",
            }}
          />

          <div
            className="absolute top-0 left-0 h-full w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${moon})`,
              backgroundPosition: "center",
            }}
          />

          <div
            className="absolute top-0 left-0 h-full w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${cloud})`,
              backgroundPosition: "center",
            }}
          />

          <div
            className="absolute top-0 left-0 h-full w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${moonLight})`,
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </>
  );
}
