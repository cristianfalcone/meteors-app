import { Meteor } from "../../../api/meteors";

export default function MeteorListItem({ meteor }: { meteor: Meteor }) {
  return (
    <div className="h-full p-5 sm:px-6 flex items-center justify-between gap-x-6">
      <div className="flex min-w-0 gap-x-4">
        <img
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          src={`https://ui-avatars.com/api/?background=random&name=${meteor.name}`}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {meteor.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {String.fromCodePoint(0x1f5d3)} {meteor.year} - {meteor.mass}g
          </p>
        </div>
      </div>
      {meteor.reclat && meteor.reclong && (
        <a
          href={`https://www.openstreetmap.org/?mlat=${meteor.reclat}&mlon=${meteor.reclong}`}
          className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          target="_blank"
          rel="noopener noreferrer"
        >
          Map
        </a>
      )}
    </div>
  );
}
