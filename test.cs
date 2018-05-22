
using System.Windows.Xps.Packaging;
using System.Windows.Documents;
using System.Windows.Media.Imaging;
using System.Windows.Media;
public void GetTileXps(object param)
		{
			var data = (TileXpsParameter)param;
			Stream ms=  data.SourceStream;
			int zoomLevel = data.Zoom;
			int colNdx = data.ColNdx;
			int rowNdx = data.RowNdx;

			ms.Seek(0, SeekOrigin.Begin);
			using (Package package = Package.Open(ms))
			{
				string inMemPackageUrl = string.Format("memorystream://{0}", Guid.NewGuid().ToString());
				PackageStore.AddPackage(new Uri(inMemPackageUrl), package);
				using (XpsDocument doc = new XpsDocument(package, CompressionOption.SuperFast, inMemPackageUrl))
				{
					var paginator = doc.GetFixedDocumentSequence().DocumentPaginator;
					using (var page = paginator.GetPage(0))
					{
						int tileSize = 256;

						double ratio = 1;
						int tileCount = (int)Math.Pow(2, zoomLevel);
						int targetXY = tileSize * tileCount;

						if (!page.Size.IsEmpty)
						{
							ratio = (targetXY / Math.Max(page.Size.Height, page.Size.Width));
						}
						var sliceSize = 256 / ratio;
						int dpi = 96;
						var leftMargin = Math.Max(0, (page.Size.Height - page.Size.Width) / 2) * ratio;
						var topMargin = Math.Max(0, (page.Size.Width - page.Size.Height) / 2) * ratio;

						var targetFilename = string.Format("tile_{0}_{1}-{2}.png", zoomLevel, colNdx, rowNdx);
						var topX = colNdx * tileSize;
						var topY = rowNdx * tileSize;
						// If Right X < leftMargin or left X > leftMArgin + image width .. -> whitetile
						// If bottom-Y < topMargin or topY > topMArgin + image height .. -> whitetile
						if (((topX + tileSize) < (int)leftMargin) || (topX > (targetXY - (int)leftMargin))
							|| ((topY + tileSize) < (int)topMargin) || (topY > (targetXY - (int)topMargin)))
						{
							//generate white tile
							Tile = GenerateWhiteTile();
						}

						#region create one tile
						DrawingVisual drawingVisual = new DrawingVisual();
						using (var dc = drawingVisual.RenderOpen())
						{
							dc.DrawRectangle(System.Windows.Media.Brushes.White, null, new Rect(0, 0, targetXY, targetXY));
							var brush = new VisualBrush(page.Visual);
							dc.DrawRectangle(brush, null, new Rect(leftMargin, topMargin, page.Size.Width * ratio, page.Size.Height * ratio));
						}

						//drawingVisual.Clip = new RectangleGeometry(new Rect(col * tileSize, row * tileSize,tileSize,tileSize));
						drawingVisual.Transform = new TranslateTransform(-topX, -topY);

						var bitmap = new RenderTargetBitmap(tileSize, tileSize, dpi, dpi, PixelFormats.Pbgra32);
						bitmap.Render(drawingVisual);
						//// Memory leak fix.
						//// http://social.msdn.microsoft.com/Forums/en/wpf/thread/c6511918-17f6-42be-ac4c-459eeac676fd
						((FixedPage)page.Visual).UpdateLayout();

						using (var stream = new MemoryStream())
						{
							BitmapEncoder encoder = new PngBitmapEncoder();
							encoder.Frames.Add(BitmapFrame.Create(bitmap));
							encoder.Save(stream);
							stream.Seek(0, SeekOrigin.Begin);
							Tile = Bitmap.FromStream(stream);
						}
						#endregion
					}
				}
			}
		}