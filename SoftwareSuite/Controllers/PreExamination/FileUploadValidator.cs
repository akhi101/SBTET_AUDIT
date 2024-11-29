using System;
using System.IO;
using System.Linq;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNetCore.Http;

public class FileUploadValidator
{
    // Define a list of allowed file extensions
    private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".gif" };

    // Define a list of allowed MIME types
    private static readonly string[] AllowedMimeTypes = { "image/jpeg", "image/png", "image/gif" };

    // Method to check if the file extension is allowed
    public static bool IsValidExtension(string fileName)
    {
        // Get the file extension (case-insensitive)
        string extension = Path.GetExtension(fileName).ToLowerInvariant();

        // Check if the extension is in the allowed list
        bool var = AllowedExtensions.Contains(extension);
        return var;
    }

    // Method to check if the MIME type is allowed
    public static bool IsValidMimeType(string mimeType)
    {
        // Check if the MIME type is in the allowed list
        return AllowedMimeTypes.Contains(mimeType.ToLowerInvariant());
    }

    // Method to validate the uploaded file (both extension and MIME type)
    public static bool IsValidFile(IFormFile file)
    {
        // Check if the file extension is valid
        if (!IsValidExtension(file.FileName))
        {
            Console.WriteLine("Invalid file extension.");
            return false;
        }

        // Check if the file MIME type is valid
        if (!IsValidMimeType(file.ContentType))
        {
            Console.WriteLine("Invalid MIME type.");
            return false;
        }

        return true;
    }
}
